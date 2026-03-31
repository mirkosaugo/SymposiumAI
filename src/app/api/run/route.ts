import Anthropic from "@anthropic-ai/sdk";
import type { NodeInput, StructuredOutput } from "@/types/canvas";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODE_INSTRUCTIONS: Record<string, string> = {
  contraddici:
    "Sfida ogni assunzione, trova i punti deboli, fai il devil's advocate. Sii diretto e provocatorio nelle critiche.",
  collabora:
    "Espandi le idee, trova connessioni inaspettate, proponi sviluppi concreti. Sii costruttivo e generativo.",
  analizza:
    "Analisi critica strutturata: trova gap logici, evidenzia contraddizioni, valuta fattibilità. Sii preciso e metodico.",
  provoca:
    "Reframe radicale: ipotesi estreme, domande scomode, prospettive controintuitive. Spingi il pensiero oltre i limiti.",
};

const SYSTEM_PROMPT = `Sei un facilitatore strategico. Il tuo compito è sintetizzare un brainstorming board e produrre output strutturato e actionable.

Rispondi SEMPRE nel seguente formato JSON:

{
  "synthesis": "Sintesi narrativa coesa di tutte le idee (2-4 paragrafi)",
  "conflicts": [
    { "between": "Nodo A vs Nodo B", "tension": "Descrizione del conflitto o tensione" }
  ],
  "openQuestions": [
    { "question": "Domanda irrisolta", "isBlocking": true, "suggestedApproach": "Come esplorarla" }
  ],
  "nextSteps": [
    { "action": "Azione concreta", "priority": "high", "rationale": "Perché questa" }
  ],
  "goalAlignment": "Se ci sono Goal Card: valutazione di quanto le idee siano allineate agli obiettivi"
}

Se una sezione non è applicabile (es. nessun conflitto trovato), usa array vuoto [].
Se non ci sono Goal Card, ometti goalAlignment.
Sii specifico e diretto. Evita genericità.
Rispondi SOLO con il JSON, senza markdown code fences o altro testo.`;

function buildSemanticPrompt(inputs: NodeInput[]): string {
  const goals = inputs.filter((i) => i.role === "goal");
  const ideas = inputs.filter((i) => i.role === "idea");
  const questions = inputs.filter((i) => i.role === "question");
  const previousOutputs = inputs.filter((i) => i.metadata?.source === "previous-run-flow");
  const context = inputs.filter((i) => i.role === "context" && i.metadata?.source !== "previous-run-flow");
  const evidence = inputs.filter((i) => i.role === "evidence");
  const perspectives = inputs.filter((i) => i.role === "perspective");

  const sections: string[] = [];

  sections.push("Analizza il seguente brainstorming board:");

  if (goals.length > 0) {
    sections.push(
      "OBIETTIVI:\n" +
        goals
          .map((g) => {
            let line = `- ${g.content}`;
            if (g.metadata?.priority) line += ` [priorità: ${g.metadata.priority}]`;
            if (g.metadata?.timeframe) line += ` [timeframe: ${g.metadata.timeframe}]`;
            return line;
          })
          .join("\n")
    );
  }

  if (ideas.length > 0) {
    sections.push(
      "IDEE E CONCETTI:\n" +
        ideas
          .map((i) => {
            let line = `- ${i.content}`;
            if (i.metadata?.tags) line += ` (tags: ${i.metadata.tags})`;
            return line;
          })
          .join("\n")
    );
  }

  if (questions.length > 0) {
    sections.push(
      "DOMANDE APERTE:\n" +
        questions
          .map((q) => {
            let line = `- ${q.content}`;
            if (q.metadata?.isBlocking === "true") line += " ⚠ BLOCKING";
            if (q.metadata?.context) line += ` (contesto: ${q.metadata.context})`;
            return line;
          })
          .join("\n")
    );
  }

  if (previousOutputs.length > 0) {
    sections.push(
      "ELABORAZIONI PRECEDENTI (output di Run Flow precedenti):\n" +
        "Questi sono output di sessioni di brainstorming precedenti. " +
        "Usali come contesto consolidato, non come semplice input da riassumere di nuovo.\n" +
        previousOutputs.map((p) => `- ${p.content}`).join("\n\n")
    );
  }

  if (context.length > 0 || evidence.length > 0) {
    const items = [...context, ...evidence];
    sections.push(
      "CONTESTO E EVIDENZE:\n" + items.map((c) => `- ${c.content}`).join("\n")
    );
  }

  if (perspectives.length > 0) {
    sections.push(
      "PROSPETTIVE DEI DIGITAL TWINS:\n" +
        "Per ciascun Digital Twin presente, genera una risposta IN CHARACTER seguendo rigorosamente il suo mode.\n" +
        perspectives
          .map((p) => {
            const mode = p.metadata?.mode || "collabora";
            const instruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.collabora;
            let line = `- ${p.content}: ${instruction}`;
            if (p.metadata?.personality) line += ` Personalità: ${p.metadata.personality}.`;
            return line;
          })
          .join("\n")
    );

    sections.push(
      "IMPORTANTE: Dopo il JSON principale, genera una sezione separata per ogni Digital Twin.\n" +
        "Formatta ciascuna risposta twin così:\n" +
        perspectives
          .map(
            (p) =>
              `===TWIN:${p.nodeId}===\n[La risposta in character del twin ${p.content}]\n===END_TWIN===`
          )
          .join("\n") +
        "\nOgni twin deve rispondere IN CHARACTER al contenuto del board, seguendo il proprio mode."
    );
  }

  return sections.join("\n\n");
}

function parseTwinResponses(
  text: string,
  twinNodeIds: string[]
): { mainResult: string; twinResponses: Record<string, string> } {
  const twinResponses: Record<string, string> = {};
  let mainResult = text;

  for (const nodeId of twinNodeIds) {
    const startTag = `===TWIN:${nodeId}===`;
    const endTag = `===END_TWIN===`;
    const startIdx = text.indexOf(startTag);
    if (startIdx === -1) continue;

    const contentStart = startIdx + startTag.length;
    const endIdx = text.indexOf(endTag, contentStart);
    if (endIdx === -1) continue;

    twinResponses[nodeId] = text.slice(contentStart, endIdx).trim();
    mainResult = mainResult.replace(
      text.slice(startIdx, endIdx + endTag.length),
      ""
    );
  }

  return { mainResult: mainResult.trim(), twinResponses };
}

function parseStructuredOutput(text: string): { structured: StructuredOutput | null; raw: string } {
  // Try to extract JSON from the text (handle potential markdown fences)
  let jsonStr = text.trim();
  const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    jsonStr = fenceMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);
    const structured: StructuredOutput = {
      synthesis: parsed.synthesis ?? "",
      conflicts: Array.isArray(parsed.conflicts) ? parsed.conflicts : [],
      openQuestions: Array.isArray(parsed.openQuestions) ? parsed.openQuestions : [],
      nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
      goalAlignment: parsed.goalAlignment || undefined,
    };
    return { structured, raw: structured.synthesis };
  } catch {
    // If JSON parsing fails, return raw text
    return { structured: null, raw: text };
  }
}

export async function POST(request: Request) {
  try {
    const { inputs } = (await request.json()) as { inputs: NodeInput[] };

    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return Response.json(
        { error: "No input provided" },
        { status: 400 }
      );
    }

    const prompt = buildSemanticPrompt(inputs);
    const twinNodeIds = inputs
      .filter((i) => i.nodeType === "digitalTwin")
      .map((i) => i.nodeId);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const rawText = textBlock ? textBlock.text : "No result generated";

    // Separate twin responses from main output
    let mainText = rawText;
    let twinResponses: Record<string, string> = {};

    if (twinNodeIds.length > 0) {
      const parsed = parseTwinResponses(rawText, twinNodeIds);
      mainText = parsed.mainResult;
      twinResponses = parsed.twinResponses;
    }

    // Parse structured JSON from main text
    const { structured, raw } = parseStructuredOutput(mainText);

    return Response.json({
      result: raw,
      structuredOutput: structured,
      ...(Object.keys(twinResponses).length > 0 ? { twinResponses } : {}),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Run API error:", errorMessage);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
