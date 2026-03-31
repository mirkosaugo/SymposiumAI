import type { CanvasNode } from "@/types/canvas";
import { NODE_COLORS } from "./constants";

export interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  nodes: CanvasNode[];
}

// --- Template 1: Product Critique ---

const productCritiqueNodes: CanvasNode[] = [
  {
    id: "tpl-goal",
    type: "goalCard",
    position: { x: 400, y: 0 },
    data: { title: "Validare il concept di prodotto", successCriteria: "", timeframe: "", priority: "high" as const, color: NODE_COLORS.goalCard },
  },
  {
    id: "tpl-c1",
    type: "conceptCard",
    position: { x: 100, y: 180 },
    data: { title: "", description: "", tags: ["feature"], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-c2",
    type: "conceptCard",
    position: { x: 400, y: 180 },
    data: { title: "", description: "", tags: ["benefit"], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-c3",
    type: "conceptCard",
    position: { x: 700, y: 180 },
    data: { title: "", description: "", tags: ["feature"], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-twin-critico",
    type: "digitalTwin",
    position: { x: 0, y: 380 },
    data: { name: "Critico", mode: "contraddici" as const, personality: "", lastResponse: "", status: "idle" as const, color: NODE_COLORS.digitalTwin },
  },
  {
    id: "tpl-twin-innovatore",
    type: "digitalTwin",
    position: { x: 750, y: 380 },
    data: { name: "Innovatore", mode: "collabora" as const, personality: "", lastResponse: "", status: "idle" as const, color: NODE_COLORS.digitalTwin },
  },
  {
    id: "tpl-perp",
    type: "perplexityCard",
    position: { x: 100, y: 560 },
    data: { question: "Quale problema risolve davvero?", context: "", isBlocking: true, color: NODE_COLORS.perplexityCard },
  },
  {
    id: "tpl-run",
    type: "run",
    position: { x: 380, y: 580 },
    data: { label: "Run AI", status: "idle" as const, result: "", color: NODE_COLORS.run },
  },
];

// --- Template 2: Decision Matrix ---

const decisionMatrixNodes: CanvasNode[] = [
  {
    id: "tpl-goal",
    type: "goalCard",
    position: { x: 350, y: 0 },
    data: { title: "Decisione da prendere", successCriteria: "", timeframe: "", priority: "high" as const, color: NODE_COLORS.goalCard },
  },
  {
    id: "tpl-c1",
    type: "conceptCard",
    position: { x: 100, y: 180 },
    data: { title: "Opzione A", description: "", tags: [], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-c2",
    type: "conceptCard",
    position: { x: 600, y: 180 },
    data: { title: "Opzione B", description: "", tags: [], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-twin-analista",
    type: "digitalTwin",
    position: { x: 0, y: 380 },
    data: { name: "Analista", mode: "analizza" as const, personality: "", lastResponse: "", status: "idle" as const, color: NODE_COLORS.digitalTwin },
  },
  {
    id: "tpl-twin-devil",
    type: "digitalTwin",
    position: { x: 700, y: 380 },
    data: { name: "Devil's Advocate", mode: "provoca" as const, personality: "", lastResponse: "", status: "idle" as const, color: NODE_COLORS.digitalTwin },
  },
  {
    id: "tpl-perp1",
    type: "perplexityCard",
    position: { x: 50, y: 560 },
    data: { question: "Cosa non sai su Opzione A?", context: "", isBlocking: false, color: NODE_COLORS.perplexityCard },
  },
  {
    id: "tpl-perp2",
    type: "perplexityCard",
    position: { x: 600, y: 560 },
    data: { question: "Cosa non sai su Opzione B?", context: "", isBlocking: false, color: NODE_COLORS.perplexityCard },
  },
  {
    id: "tpl-run",
    type: "run",
    position: { x: 330, y: 580 },
    data: { label: "Run AI", status: "idle" as const, result: "", color: NODE_COLORS.run },
  },
];

// --- Template 3: Research Synthesis ---

const researchSynthesisNodes: CanvasNode[] = [
  {
    id: "tpl-goal",
    type: "goalCard",
    position: { x: 350, y: 0 },
    data: { title: "Cosa voglio capire?", successCriteria: "", timeframe: "", priority: "medium" as const, color: NODE_COLORS.goalCard },
  },
  {
    id: "tpl-c1",
    type: "conceptCard",
    position: { x: 50, y: 180 },
    data: { title: "", description: "", tags: ["tema-chiave"], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-c2",
    type: "conceptCard",
    position: { x: 330, y: 180 },
    data: { title: "", description: "", tags: ["tema-chiave"], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-c3",
    type: "conceptCard",
    position: { x: 610, y: 180 },
    data: { title: "", description: "", tags: ["tema-chiave"], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-c4",
    type: "conceptCard",
    position: { x: 890, y: 180 },
    data: { title: "", description: "", tags: ["tema-chiave"], color: NODE_COLORS.conceptCard },
  },
  {
    id: "tpl-t1",
    type: "text",
    position: { x: 0, y: 380 },
    data: { text: "", color: NODE_COLORS.text },
  },
  {
    id: "tpl-t2",
    type: "text",
    position: { x: 300, y: 380 },
    data: { text: "", color: NODE_COLORS.text },
  },
  {
    id: "tpl-twin-ricercatore",
    type: "digitalTwin",
    position: { x: 620, y: 380 },
    data: { name: "Ricercatore", mode: "analizza" as const, personality: "", lastResponse: "", status: "idle" as const, color: NODE_COLORS.digitalTwin },
  },
  {
    id: "tpl-perp1",
    type: "perplexityCard",
    position: { x: 50, y: 560 },
    data: { question: "", context: "", isBlocking: false, color: NODE_COLORS.perplexityCard },
  },
  {
    id: "tpl-perp2",
    type: "perplexityCard",
    position: { x: 600, y: 560 },
    data: { question: "", context: "", isBlocking: false, color: NODE_COLORS.perplexityCard },
  },
  {
    id: "tpl-run",
    type: "run",
    position: { x: 380, y: 720 },
    data: { label: "Run AI", status: "idle" as const, result: "", color: NODE_COLORS.run },
  },
];

// --- Export ---

export const FLOW_TEMPLATES: FlowTemplate[] = [
  {
    id: "product-critique",
    name: "Product Critique",
    description: "Valida un concept di prodotto con twin critico e innovatore",
    nodes: productCritiqueNodes,
  },
  {
    id: "decision-matrix",
    name: "Decision Matrix",
    description: "Confronta opzioni con analista e devil's advocate",
    nodes: decisionMatrixNodes,
  },
  {
    id: "research-synthesis",
    name: "Research Synthesis",
    description: "Sintetizza ricerca con temi chiave, citazioni e domande",
    nodes: researchSynthesisNodes,
  },
];
