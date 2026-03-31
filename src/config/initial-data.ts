import type { CanvasNode } from "@/types/canvas";

export const initialNodes: CanvasNode[] = [
  // Text nodes
  {
    id: "t1",
    type: "text",
    position: { x: 520, y: 20 },
    data: {
      text: "Explore the concept of digital metamorphosis: how bodies transform through filters, generative AI, and augmented reality. What remains of the original identity?",
      color: "#64748b",
    },
  },
  {
    id: "t2",
    type: "text",
    position: { x: 280, y: 100 },
    data: {
      text: "Color palette: cool tones (cyan, lavender) blending with organic red. Contrast between artificial and natural.",
      color: "#64748b",
    },
  },

  // Concept cards
  {
    id: "c1",
    type: "conceptCard",
    position: { x: 880, y: 40 },
    data: {
      title: "Fluid Identity",
      description: "Portrait series where the subject's face dissolves and recomposes through generative patterns. Each iteration produces a different version of identity.",
      tags: ["portrait", "generative", "identity"],
      color: "#A78BFA",
    },
  },
  {
    id: "c2",
    type: "conceptCard",
    position: { x: 880, y: 270 },
    data: {
      title: "Synthetic Memory",
      description: "Installation using personal archive photos reworked by AI to create memories that never existed but feel authentic.",
      tags: ["installation", "memory", "archive"],
      color: "#FF6B9D",
    },
  },
  {
    id: "c3",
    type: "conceptCard",
    position: { x: 1200, y: 150 },
    data: {
      title: "Body-Interface",
      description: "Performance where the body becomes a projection surface for real-time AI output, reacting to the performer's movements.",
      tags: ["performance", "body", "realtime"],
      color: "#34D399",
    },
  },

  // Image upload nodes
  {
    id: "i1",
    type: "imageUpload",
    position: { x: 0, y: 180 },
    data: {
      src: null,
      caption: "Reference: organic textures",
      color: "#38BDF8",
    },
  },
  {
    id: "i2",
    type: "imageUpload",
    position: { x: 820, y: 500 },
    data: {
      src: null,
      caption: "Color palette moodboard",
      color: "#38BDF8",
    },
  },

  // Run node
  {
    id: "r1",
    type: "run",
    position: { x: 1200, y: 420 },
    data: {
      label: "Synthesize Art Concept",
      status: "idle",
      result: "",
      color: "#34D399",
    },
  },
];

