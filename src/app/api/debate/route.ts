import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODE_INSTRUCTIONS: Record<string, string> = {
  contraddici:
    "Challenge every assumption, find weaknesses, play devil's advocate. Be direct and provocative.",
  collabora:
    "Expand on ideas, find connections, propose developments. Be constructive and generative.",
  analizza:
    "Structured critical analysis: find logical gaps, highlight contradictions. Be precise and methodical.",
  provoca:
    "Radical reframe: extreme hypotheses, uncomfortable questions. Push thinking beyond limits.",
};

interface TwinInfo {
  nodeId: string;
  name: string;
  mode: string;
  personality: string;
}

interface DebateRequest {
  twins: TwinInfo[];
  boardContext: string;
  rounds: number;
}

interface DebateTurn {
  nodeId: string;
  name: string;
  text: string;
}

async function generateTurn(
  twin: TwinInfo,
  boardContext: string,
  previousTurns: DebateTurn[],
): Promise<string> {
  const modeInstruction = MODE_INSTRUCTIONS[twin.mode] || MODE_INSTRUCTIONS.collabora;

  const conversationHistory = previousTurns.length > 0
    ? "CONVERSATION SO FAR:\n" +
      previousTurns.map((t) => `${t.name}: ${t.text}`).join("\n\n") +
      "\n\n---\n\nNow it's your turn. Respond directly to what was said. Be specific — agree, disagree, build on, or challenge particular points."
    : "You are the first to speak. React to the board content below.";

  const systemPrompt = `You are ${twin.name}. You are in a debate with other thinkers.

YOUR MODE: ${modeInstruction}

${twin.personality ? `YOUR PERSONALITY: ${twin.personality}` : ""}

RULES:
- Stay fully in character as ${twin.name}.
- Keep your response to 1-2 focused paragraphs.
- Address other speakers by name when responding to their points.
- Do NOT repeat what others said — react to it.`;

  const userPrompt = `BOARD CONTENT:
${boardContext}

${conversationHistory}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 800,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  return textBlock ? textBlock.text : "";
}

export async function POST(request: Request) {
  try {
    const { twins, boardContext, rounds = 1 } =
      (await request.json()) as DebateRequest;

    if (!twins || twins.length < 2) {
      return Response.json(
        { error: "At least 2 twins are required for a debate" },
        { status: 400 },
      );
    }

    const allTurns: DebateTurn[] = [];
    const responses: Record<string, string> = {};

    for (let round = 0; round < rounds; round++) {
      for (const twin of twins) {
        const text = await generateTurn(twin, boardContext, allTurns);
        allTurns.push({ nodeId: twin.nodeId, name: twin.name, text });

        // Accumulate responses per twin (multiple rounds get appended)
        responses[twin.nodeId] = responses[twin.nodeId]
          ? responses[twin.nodeId] + "\n\n---\n\n" + text
          : text;
      }
    }

    return Response.json({ responses, transcript: allTurns });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Debate API error:", errorMessage);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
