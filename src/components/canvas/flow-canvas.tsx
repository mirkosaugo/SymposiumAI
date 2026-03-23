"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type OnConnect,
  addEdge,
  useViewport,
  getIncomers,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { ToolMode, CanvasNode, RunNodeData, TextNodeData, ConceptCardData, ImageUploadData } from "@/types/canvas";
import { initialNodes, initialEdges } from "@/config/initial-data";
import { TextNodeComponent_ } from "./text-node";
import { ConceptCardNodeComponent_ } from "./concept-card-node";
import { ImageNodeComponent_ } from "./image-node";
import { RunNodeComponent_ } from "./run-node";
import { DotGlowBackground } from "./dot-glow-background";
import { CanvasToolbar } from "./canvas-toolbar";
import { PromptBar } from "@/components/prompt/prompt-bar";
import { StatusBar } from "@/components/panels/status-bar";

const SNAP_GRID: [number, number] = [16, 16];

const NODE_COLORS: Record<string, string> = {
  text: "#64748b",
  conceptCard: "#A78BFA",
  imageUpload: "#38BDF8",
  run: "#34D399",
};

let nodeIdCounter = 100;
function nextId() {
  return `node-${++nodeIdCounter}`;
}

function buildNodeData(type: string) {
  switch (type) {
    case "text":
      return { text: "", color: NODE_COLORS.text };
    case "conceptCard":
      return { title: "", description: "", tags: [], color: NODE_COLORS.conceptCard };
    case "imageUpload":
      return { src: null, caption: "", color: NODE_COLORS.imageUpload };
    case "run":
      return { label: "Run AI", status: "idle" as const, result: "", color: NODE_COLORS.run };
    default:
      return {};
  }
}

function FlowCanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeTool, setActiveTool] = useState<ToolMode>("select");
  const [isRunning, setIsRunning] = useState(false);
  const { zoomIn, zoomOut, fitView, screenToFlowPosition } = useReactFlow();
  const viewport = useViewport();

  const nodeTypes = useMemo(
    () => ({
      text: TextNodeComponent_,
      conceptCard: ConceptCardNodeComponent_,
      imageUpload: ImageNodeComponent_,
      run: RunNodeComponent_,
    }),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#ffffff30", strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const defaultEdgeOptions = useMemo(
    () => ({
      animated: true,
      style: { stroke: "#ffffff30", strokeWidth: 2 },
    }),
    []
  );

  const handleAddNode = useCallback(
    (type: "text" | "conceptCard" | "imageUpload" | "run") => {
      const center = screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 100,
      });
      // Offset randomly to avoid stacking
      const offset = { x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 150 };

      const newNode: CanvasNode = {
        id: nextId(),
        type,
        position: { x: center.x + offset.x, y: center.y + offset.y },
        data: buildNodeData(type),
      } as CanvasNode;

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  // Gather all content from nodes connected (directly or transitively) to a run node
  const gatherInputs = useCallback(
    (runNodeId: string) => {
      const visited = new Set<string>();
      const contents: string[] = [];

      function walk(nodeId: string) {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);

        const node = nodes.find((n) => n.id === nodeId);
        if (!node) return;

        // Collect content based on type
        if (node.type === "text") {
          const d = node.data as unknown as TextNodeData;
          if (d.text) contents.push(`[Text] ${d.text}`);
        } else if (node.type === "conceptCard") {
          const d = node.data as unknown as ConceptCardData;
          if (d.title || d.description) {
            contents.push(`[Concept: ${d.title}] ${d.description} (tags: ${d.tags.join(", ")})`);
          }
        } else if (node.type === "imageUpload") {
          const d = node.data as unknown as ImageUploadData;
          if (d.caption) contents.push(`[Image] ${d.caption}`);
          // NOTE: image data could be sent as base64 in a real implementation
        }

        // Walk incomers
        const incomers = getIncomers(node, nodes, edges);
        incomers.forEach((inc) => walk(inc.id));
      }

      // Start from the run node's incomers
      const runNode = nodes.find((n) => n.id === runNodeId);
      if (runNode) {
        const incomers = getIncomers(runNode, nodes, edges);
        incomers.forEach((inc) => walk(inc.id));
      }

      return contents;
    },
    [nodes, edges]
  );

  const handleRunAI = useCallback(async () => {
    // Find all run nodes
    const runNodes = nodes.filter((n) => n.type === "run");
    if (runNodes.length === 0) {
      console.log("No Run node found. Add one!");
      return;
    }

    setIsRunning(true);

    for (const runNode of runNodes) {
      const inputs = gatherInputs(runNode.id);

      if (inputs.length === 0) {
        console.log(`Run "${(runNode.data as unknown as RunNodeData).label}": no connected content`);
        continue;
      }

      // Update status to running
      setNodes((nds) =>
        nds.map((n) =>
          n.id === runNode.id ? { ...n, data: { ...n.data, status: "running", result: "" } as RunNodeData } as CanvasNode : n
        )
      );
      console.log(`Processing "${(runNode.data as unknown as RunNodeData).label}" with ${inputs.length} inputs...`);

      try {
        const res = await fetch("/api/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inputs }),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const json = await res.json();
        const result = json.result || "No result";

        setNodes((nds) =>
          nds.map((n) =>
            n.id === runNode.id ? { ...n, data: { ...n.data, status: "done", result } as RunNodeData } as CanvasNode : n
          )
        );
        console.log(`Completed "${(runNode.data as unknown as RunNodeData).label}"`);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setNodes((nds) =>
          nds.map((n) =>
            n.id === runNode.id ? { ...n, data: { ...n.data, status: "error", result: message } as RunNodeData } as CanvasNode : n
          )
        );
        console.log(`Error: ${message}`);
      }
    }

    setIsRunning(false);
  }, [nodes, gatherInputs, setNodes]);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        panOnDrag={activeTool === "hand" ? true : [1]}
        selectionOnDrag={activeTool === "select"}
        snapToGrid
        snapGrid={SNAP_GRID}
        fitView
        fitViewOptions={{ padding: 0.2, includeHiddenNodes: true }}
        proOptions={{ hideAttribution: true }}
        deleteKeyCode={["Backspace", "Delete"]}
        style={{
          ["--xy-background-color" as string]: "var(--color-background)",
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#666"
        />
        <DotGlowBackground />
      </ReactFlow>

      {/* Overlays */}
      <CanvasToolbar activeTool={activeTool} onToolChange={setActiveTool} />
      <PromptBar onAddNode={handleAddNode} onRunAI={handleRunAI} isRunning={isRunning} />
      <StatusBar
        zoom={viewport.zoom}
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView({ padding: 0.1 })}
      />
    </div>
  );
}

export function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}
