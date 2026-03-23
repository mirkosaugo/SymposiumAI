import type { Node, Edge } from "@xyflow/react";

// --- Node data interfaces ---

export interface TextNodeData extends Record<string, unknown> {
  text: string;
  color: string;
}

export interface ConceptCardData extends Record<string, unknown> {
  title: string;
  description: string;
  tags: string[];
  color: string;
}

export interface ImageUploadData extends Record<string, unknown> {
  src: string | null; // base64 data URL or null if empty
  caption: string;
  color: string;
}

export interface RunNodeData extends Record<string, unknown> {
  label: string;
  status: "idle" | "running" | "done" | "error";
  result: string;
  color: string;
}

// --- Node type aliases ---

export type TextNode = Node<TextNodeData, "text">;
export type ConceptCardNode = Node<ConceptCardData, "conceptCard">;
export type ImageUploadNode = Node<ImageUploadData, "imageUpload">;
export type RunNode = Node<RunNodeData, "run">;

export type CanvasNode = TextNode | ConceptCardNode | ImageUploadNode | RunNode;
export type CanvasEdge = Edge;

export type ToolMode = "select" | "hand";
