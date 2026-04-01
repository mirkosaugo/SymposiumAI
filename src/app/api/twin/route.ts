import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODE_INSTRUCTIONS: Record<string, string> = {
  contraddici:
    "Challenge every assumption, find weaknesses, play devil's advocate. Be direct and provocative in your critiques.",
  collabora:
    "Expand on ideas, find unexpected connections, propose concrete developments. Be constructive and generative.",
  analizza:
    "Structured critical analysis: find logical gaps, highlight contradictions, assess feasibility. Be precise and methodical.",
  provoca:
    "Radical reframe: extreme hypotheses, uncomfortable questions, counterintuitive perspectives. Push thinking beyond limits.",
};

interface TwinRequest {
  name: string;
  mode: string;
  personality: string;
  synthesis: string;
  boardContext: string;
}

export async function POST(request: Request) {
  try {
    const { name, mode, personality, synthesis, boardContext } =
      (await request.json()) as TwinRequest;

    const modeInstruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.collabora;

    const systemPrompt = `You are ${name}. You are a Digital Twin — an AI persona participating in a brainstorming session.

YOUR MODE: ${modeInstruction}

${personality ? `YOUR PERSONALITY: ${personality}` : ""}

RULES:
- Stay fully in character. Speak as ${name} would speak.
- Your response should be 2-4 paragraphs.
- React to the synthesis and the board content from your unique perspective.
- Do NOT repeat the synthesis — challenge it, expand it, reframe it, or analyze it depending on your mode.
- Be specific. Reference actual ideas from the board.`;

    const userPrompt = `Here is the board you are responding to:

${boardContext}

---

Here is the synthesis that was just generated from this board:

${synthesis}

---

Now respond in character as ${name}. What is your take?`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const response = textBlock ? textBlock.text : "No response generated";

    return Response.json({ response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Twin API error:", errorMessage);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
