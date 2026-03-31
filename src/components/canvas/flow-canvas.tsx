"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
  useViewport,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type {
  ToolMode,
  CanvasNode,
  RunNodeData,
  TextNodeData,
  ConceptCardData,
  ImageUploadData,
  GoalCardData,
  PerplexityCardData,
  DigitalTwinData,
  SynthesisOutputData,
  NodeInput,
} from "@/types/canvas";
import { initialNodes } from "@/config/initial-data";
import { NODE_COLORS, SNAP_GRID } from "@/config/constants";
import { loadNodes, useCanvasStorage } from "@/hooks/use-canvas-storage";
import { NodeEditorContext } from "@/hooks/use-node-editor";
import { NodeEditDrawer } from "./node-edit-drawer";
import { TextNodeComponent_ } from "./text-node";
import { ConceptCardNodeComponent_ } from "./concept-card-node";
import { ImageNodeComponent_ } from "./image-node";
import { RunNodeComponent_ } from "./run-node";
import { GoalCardNodeComponent_ } from "./goal-card-node";
import { PerplexityCardNodeComponent_ } from "./perplexity-card-node";
import { DigitalTwinNodeComponent_ } from "./digital-twin-node";
import { SynthesisOutputNodeComponent_ } from "./synthesis-output-node";
import { ChainFlowContext } from "@/hooks/use-chain-flow";
import { AmbientGlow } from "./ambient-glow";
import { DotGlowBackground } from "./dot-glow-background";
import { CanvasToolbar } from "./canvas-toolbar";
import { ColorFilterBar } from "./color-filter-bar";
import { PromptBar } from "@/components/prompt/prompt-bar";
import { StatusBar } from "@/components/panels/status-bar";
import type { FlowTemplate } from "@/config/flow-templates";

let nodeIdCounter = 100;
function nextId() {
  return `node-${++nodeIdCounter}`;
}

function buildNodeData(type: string) {
  switch (type) {
    case "text":
      return { text: "", color: NODE_COLORS.text };
    case "conceptCard":
      return {
        title: "",
        description: "",
        tags: [],
        color: NODE_COLORS.conceptCard,
      };
    case "imageUpload":
      return { src: null, caption: "", color: NODE_COLORS.imageUpload };
    case "run":
      return {
        label: "Generate",
        status: "idle" as const,
        result: "",
        color: NODE_COLORS.run,
      };
    case "goalCard":
      return {
        title: "",
        successCriteria: "",
        timeframe: "",
        priority: "medium" as const,
        color: NODE_COLORS.goalCard,
      };
    case "perplexityCard":
      return {
        question: "",
        context: "",
        isBlocking: false,
        color: NODE_COLORS.perplexityCard,
      };
    case "digitalTwin":
      return {
        name: "",
        mode: "collabora" as const,
        personality: "",
        lastResponse: "",
        status: "idle" as const,
        color: NODE_COLORS.digitalTwin,
      };
    default:
      return {};
  }
}

function FlowCanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [activeTool, setActiveTool] = useState<ToolMode>("select");
  const [isRunning, setIsRunning] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [isNewNode, setIsNewNode] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { zoomIn, zoomOut, fitView, screenToFlowPosition, getNode } =
    useReactFlow();
  const viewport = useViewport();
  const { save, exportJSON, importJSON } = useCanvasStorage();

  // Hydrate from localStorage after mount
  useEffect(() => {
    const saved = loadNodes();
    if (saved !== initialNodes) {
      setNodes(saved);
    }
    // Sync nodeIdCounter to avoid duplicate IDs
    for (const n of saved) {
      const match = n.id.match(/^node-(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num >= nodeIdCounter) nodeIdCounter = num + 1;
      }
    }
    setHydrated(true);
  }, [setNodes]);

  // Auto-save on every node change (only after hydration)
  useEffect(() => {
    if (!hydrated) return;
    save(nodes);
  }, [nodes, save, hydrated]);

  const openEditor = useCallback((nodeId: string, isNew = false) => {
    setEditingNodeId(nodeId);
    setIsNewNode(isNew);
  }, []);

  const closeEditor = useCallback(() => {
    setEditingNodeId(null);
    setIsNewNode(false);
  }, []);

  const nodeTypes = useMemo(
    () => ({
      text: TextNodeComponent_,
      conceptCard: ConceptCardNodeComponent_,
      imageUpload: ImageNodeComponent_,
      run: RunNodeComponent_,
      goalCard: GoalCardNodeComponent_,
      perplexityCard: PerplexityCardNodeComponent_,
      digitalTwin: DigitalTwinNodeComponent_,
      synthesisOutput: SynthesisOutputNodeComponent_,
    }),
    [],
  );

  const handleAddNode = useCallback(
    (
      type:
        | "text"
        | "conceptCard"
        | "imageUpload"
        | "run"
        | "goalCard"
        | "perplexityCard"
        | "digitalTwin",
    ) => {
      const center = screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 100,
      });
      const offset = {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 150,
      };

      const newNode: CanvasNode = {
        id: nextId(),
        type,
        position: { x: center.x + offset.x, y: center.y + offset.y },
        data: buildNodeData(type),
      } as CanvasNode;

      setNodes((nds) => [...nds, newNode]);

      // Auto-open editor for new nodes
      requestAnimationFrame(() => openEditor(newNode.id, true));
    },
    [screenToFlowPosition, setNodes, openEditor],
  );

  const chainFromRun = useCallback(
    (runNodeId: string) => {
      const runNode = getNode(runNodeId);
      if (!runNode) return;

      const runData = runNode.data as unknown as RunNodeData;
      const synthesis =
        runData.structuredOutput?.synthesis || runData.result || "";
      if (!synthesis) return;

      const newNodeId = nextId();
      const newNode: CanvasNode = {
        id: newNodeId,
        type: "synthesisOutput",
        position: {
          x: runNode.position.x + 350,
          y: runNode.position.y,
        },
        data: {
          sourceRunNodeId: runNodeId,
          synthesis,
          timestamp: Date.now(),
          label: "Flow Output",
          color: NODE_COLORS.run,
        },
      } as CanvasNode;

      setNodes((nds) => [...nds, newNode]);
    },
    [getNode, setNodes],
  );

  const handleLoadTemplate = useCallback(
    (template: FlowTemplate) => {
      setNodes(template.nodes);
      requestAnimationFrame(() => fitView({ padding: 0.2 }));
    },
    [setNodes, fitView],
  );

  const handleExport = useCallback(() => {
    exportJSON(nodes);
  }, [nodes, exportJSON]);

  const handleImport = useCallback(async () => {
    const imported = await importJSON();
    if (imported) {
      setNodes(imported);
      requestAnimationFrame(() => fitView({ padding: 0.2 }));
    }
  }, [importJSON, setNodes, fitView]);

  // Gather all non-run nodes as inputs for the AI run
  const gatherInputs = useCallback(
    (_runNodeId: string): NodeInput[] => {
      const inputs: NodeInput[] = [];

      for (const node of nodes) {
        // Skip run nodes and synthesis output nodes
        if (node.type === "run" || node.type === "synthesisOutput") continue;

        if (node.type === "text") {
          const d = node.data as unknown as TextNodeData;
          if (d.text) {
            inputs.push({
              nodeId: node.id,
              nodeType: "text",
              role: "context",
              content: d.text,
            });
          }
        } else if (node.type === "conceptCard") {
          const d = node.data as unknown as ConceptCardData;
          if (d.title || d.description) {
            inputs.push({
              nodeId: node.id,
              nodeType: "conceptCard",
              role: "idea",
              content: `${d.title}: ${d.description}`,
              metadata: { tags: d.tags.join(", ") },
            });
          }
        } else if (node.type === "imageUpload") {
          const d = node.data as unknown as ImageUploadData;
          if (d.caption) {
            inputs.push({
              nodeId: node.id,
              nodeType: "imageUpload",
              role: "evidence",
              content: d.caption,
            });
          }
        } else if (node.type === "goalCard") {
          const d = node.data as unknown as GoalCardData;
          if (d.title) {
            inputs.push({
              nodeId: node.id,
              nodeType: "goalCard",
              role: "goal",
              content: `${d.title} (success: ${d.successCriteria})`,
              metadata: { priority: d.priority, timeframe: d.timeframe },
            });
          }
        } else if (node.type === "perplexityCard") {
          const d = node.data as unknown as PerplexityCardData;
          if (d.question) {
            inputs.push({
              nodeId: node.id,
              nodeType: "perplexityCard",
              role: "question",
              content: d.question,
              metadata: {
                isBlocking: String(d.isBlocking),
                ...(d.context ? { context: d.context } : {}),
              },
            });
          }
        } else if (node.type === "digitalTwin") {
          const d = node.data as unknown as DigitalTwinData;
          inputs.push({
            nodeId: node.id,
            nodeType: "digitalTwin",
            role: "perspective",
            content: `[${d.mode.toUpperCase()} - ${d.name || "Unnamed"}]`,
            metadata: { mode: d.mode, personality: d.personality },
          });
        }
      }

      return inputs;
    },
    [nodes],
  );

  const handleRunAI = useCallback(async () => {
    const runNodes = nodes.filter((n) => n.type === "run");
    if (runNodes.length === 0) return;

    setIsRunning(true);

    for (const runNode of runNodes) {
      const inputs = gatherInputs(runNode.id);
      if (inputs.length === 0) continue;

      // Set run node to running + twins to thinking
      const twinNodeIds = inputs
        .filter((i) => i.nodeType === "digitalTwin")
        .map((i) => i.nodeId);

      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === runNode.id) {
            return {
              ...n,
              data: {
                ...n.data,
                status: "running",
                result: "",
                structuredOutput: undefined,
              } as RunNodeData,
            } as CanvasNode;
          }
          if (twinNodeIds.includes(n.id)) {
            return {
              ...n,
              data: {
                ...n.data,
                status: "thinking",
                lastResponse: "",
              } as DigitalTwinData,
            } as CanvasNode;
          }
          return n;
        }),
      );

      try {
        const res = await fetch("/api/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inputs }),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const json = await res.json();
        const result = json.result || "No result";
        const structuredOutput = json.structuredOutput || undefined;
        const twinResponses: Record<string, string> = json.twinResponses || {};

        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === runNode.id) {
              return {
                ...n,
                data: {
                  ...n.data,
                  status: "done",
                  result,
                  structuredOutput,
                } as RunNodeData,
              } as CanvasNode;
            }
            if (twinResponses[n.id]) {
              return {
                ...n,
                data: {
                  ...n.data,
                  status: "done",
                  lastResponse: twinResponses[n.id],
                } as DigitalTwinData,
              } as CanvasNode;
            }
            return n;
          }),
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === runNode.id) {
              return {
                ...n,
                data: {
                  ...n.data,
                  status: "error",
                  result: message,
                } as RunNodeData,
              } as CanvasNode;
            }
            if (twinNodeIds.includes(n.id)) {
              return {
                ...n,
                data: { ...n.data, status: "idle" } as DigitalTwinData,
              } as CanvasNode;
            }
            return n;
          }),
        );
      }
    }

    setIsRunning(false);
  }, [nodes, gatherInputs, setNodes]);

  const nodeEditorValue = useMemo(
    () => ({ editingNodeId, isNewNode, openEditor, closeEditor }),
    [editingNodeId, isNewNode, openEditor, closeEditor],
  );

  const chainFlowValue = useMemo(() => ({ chainFromRun }), [chainFromRun]);

  return (
    <ChainFlowContext value={chainFlowValue}>
      <NodeEditorContext value={nodeEditorValue}>
        <div className="relative h-full w-full">
          <ReactFlow
            nodes={nodes}
            edges={[]}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            panOnDrag={activeTool === "hand" ? true : [1]}
            selectionOnDrag={activeTool === "select"}
            nodesConnectable={false}
            snapToGrid
            snapGrid={SNAP_GRID}
            minZoom={0.3}
            maxZoom={2}
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

          <AmbientGlow active={isRunning} />

          {/* Overlays */}
          <ColorFilterBar nodes={nodes} />
          <CanvasToolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            onLoadTemplate={handleLoadTemplate}
            onExport={handleExport}
            onImport={handleImport}
            hasContent={nodes.length > 0}
          />
          <PromptBar
            onAddNode={handleAddNode}
            onRunAI={handleRunAI}
            isRunning={isRunning}
          />
          <StatusBar
            zoom={viewport.zoom}
            onZoomIn={() => zoomIn()}
            onZoomOut={() => zoomOut()}
            onFitView={() => fitView({ padding: 0.1 })}
          />
          <NodeEditDrawer />
        </div>
      </NodeEditorContext>
    </ChainFlowContext>
  );
}

export function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}
