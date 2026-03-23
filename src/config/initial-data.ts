import type { CanvasNode, CanvasEdge } from "@/types/canvas";

export const initialNodes: CanvasNode[] = [
  // Text nodes
  {
    id: "t1",
    type: "text",
    position: { x: 80, y: 80 },
    data: {
      text: "Explore the concept of digital metamorphosis: how bodies transform through filters, generative AI, and augmented reality. What remains of the original identity?",
      color: "#64748b",
    },
  },
  {
    id: "t2",
    type: "text",
    position: { x: 80, y: 320 },
    data: {
      text: "Color palette: cool tones (cyan, lavender) blending with organic red. Contrast between artificial and natural.",
      color: "#64748b",
    },
  },

  // Concept cards
  {
    id: "c1",
    type: "conceptCard",
    position: { x: 450, y: 60 },
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
    position: { x: 450, y: 340 },
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
    position: { x: 820, y: 200 },
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
    position: { x: 80, y: 530 },
    data: {
      src: null,
      caption: "Reference: organic textures",
      color: "#38BDF8",
    },
  },
  {
    id: "i2",
    type: "imageUpload",
    position: { x: 350, y: 590 },
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
    position: { x: 820, y: 500 },
    data: {
      label: "Synthesize Art Concept",
      status: "idle",
      result: "",
      color: "#34D399",
    },
  },
];

export const initialEdges: CanvasEdge[] = [
  { id: "e-t1-c1", source: "t1", target: "c1", animated: true, style: { stroke: "#A78BFA80", strokeWidth: 2 } },
  { id: "e-t2-c2", source: "t2", target: "c2", animated: true, style: { stroke: "#FF6B9D80", strokeWidth: 2 } },
  { id: "e-c1-c3", source: "c1", target: "c3", animated: true, style: { stroke: "#34D39980", strokeWidth: 2 } },
  { id: "e-c2-c3", source: "c2", target: "c3", animated: true, style: { stroke: "#34D39980", strokeWidth: 2 } },
  { id: "e-c3-r1", source: "c3", target: "r1", animated: true, style: { stroke: "#34D39980", strokeWidth: 2 } },
  { id: "e-i1-c2", source: "i1", target: "c2", style: { stroke: "#38BDF880", strokeWidth: 2, strokeDasharray: "5 5" } },
  { id: "e-i2-r1", source: "i2", target: "r1", style: { stroke: "#38BDF880", strokeWidth: 2, strokeDasharray: "5 5" } },
];
