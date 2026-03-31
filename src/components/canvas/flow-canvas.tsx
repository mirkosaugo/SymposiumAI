"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type OnConnect,
  type NodeMouseHandler,
  addEdge,
  useViewport,
  getIncomers,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { ToolMode, CanvasNode, RunNodeData, TextNodeData, ConceptCardData, ImageUploadData, GoalCardData, PerplexityCardData, DigitalTwinData, SynthesisOutputData, NodeInput } from "@/types/canvas";
import { initialNodes, initialEdges } from "@/config/initial-data";
import { NODE_COLORS, SNAP_GRID, DEFAULT_EDGE_STYLE } from "@/config/constants";
import { getBestHandle } from "@/lib/node-style";
import { ConnectModeContext } from "@/hooks/use-connect-mode";
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
import { CustomEdge } from "./custom-edge";
import { AmbientGlow } from "./ambient-glow";
import { DotGlowBackground } from "./dot-glow-background";
import { ConnectionLinePreview } from "./connection-line-preview";
import { CanvasToolbar } from "./canvas-toolbar";
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
      return { title: "", description: "", tags: [], color: NODE_COLORS.conceptCard };
    case "imageUpload":
      return { src: null, caption: "", color: NODE_COLORS.imageUpload };
    case "run":
      return { label: "Run AI", status: "idle" as const, result: "", color: NODE_COLORS.run };
    case "goalCard":
      return { title: "", successCriteria: "", timeframe: "", priority: "medium" as const, color: NODE_COLORS.goalCard };
    case "perplexityCard":
      return { question: "", context: "", isBlocking: false, color: NODE_COLORS.perplexityCard };
    case "digitalTwin":
      return { name: "", mode: "collabora" as const, personality: "", lastResponse: "", status: "idle" as const, color: NODE_COLORS.digitalTwin };
    default:
      return {};
  }
}

function FlowCanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeTool, setActiveTool] = useState<ToolMode>("select");
  const [isRunning, setIsRunning] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [hoveringNode, setHoveringNode] = useState<string | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [isNewNode, setIsNewNode] = useState(false);
  const { zoomIn, zoomOut, fitView, screenToFlowPosition, getNode } = useReactFlow();
  const viewport = useViewport();

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
    []
  );

  const edgeTypes = useMemo(
    () => ({ custom: CustomEdge }),
    []
  );

  // --- Connect mode ---

  const startConnect = useCallback(
    (nodeId: string) => {
      setConnectingFrom(nodeId);
      // Deselect all so toolbar disappears
      setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
    },
    [setNodes]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (!connectingFrom) return;
      if (connectingFrom === node.id) {
        // Clicked same node — cancel
        setConnectingFrom(null);
        return;
      }

      // Compute best handles based on node positions
      const sourceNode = getNode(connectingFrom);
      const targetNode = node;
      const handles = sourceNode ? getBestHandle(
        { x: sourceNode.position.x, y: sourceNode.position.y, w: sourceNode.measured?.width ?? 250, h: sourceNode.measured?.height ?? 150 },
        { x: targetNode.position.x, y: targetNode.position.y, w: targetNode.measured?.width ?? 250, h: targetNode.measured?.height ?? 150 },
      ) : { sourceHandle: "right", targetHandle: "left" };

      // Create edge
      setEdges((eds) =>
        addEdge(
          {
            id: `e-${connectingFrom}-${node.id}-${Date.now()}`,
            source: connectingFrom,
            target: node.id,
            sourceHandle: handles.sourceHandle,
            targetHandle: handles.targetHandle,
            type: "custom",
            animated: true,
            style: DEFAULT_EDGE_STYLE,
          },
          eds
        )
      );
      setConnectingFrom(null);
      setHoveringNode(null);
    },
    [connectingFrom, setEdges]
  );

  // Prevent node selection while connecting
  const onNodeMouseEnter: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (connectingFrom && connectingFrom !== node.id) {
        setHoveringNode(node.id);
      }
    },
    [connectingFrom]
  );

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    setHoveringNode(null);
  }, []);

  const cancelConnect = useCallback(() => {
    setConnectingFrom(null);
    setHoveringNode(null);
  }, []);

  const onPaneClick = useCallback(() => {
    if (connectingFrom) cancelConnect();
  }, [connectingFrom, cancelConnect]);

  // Escape key cancels connect mode
  useEffect(() => {
    if (!connectingFrom) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancelConnect();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [connectingFrom, cancelConnect]);

  // Deselect all nodes while in connect mode
  const styledNodes = useMemo(() => {
    if (!connectingFrom) return nodes;
    return nodes.map((n) => ({ ...n, selected: false }));
  }, [nodes, connectingFrom]);

  // --- Standard handlers ---

  const onConnect: OnConnect = useCallback(
    (params) => {
      const sNode = params.source ? getNode(params.source) : null;
      const tNode = params.target ? getNode(params.target) : null;
      const handles = sNode && tNode ? getBestHandle(
        { x: sNode.position.x, y: sNode.position.y, w: sNode.measured?.width ?? 250, h: sNode.measured?.height ?? 150 },
        { x: tNode.position.x, y: tNode.position.y, w: tNode.measured?.width ?? 250, h: tNode.measured?.height ?? 150 },
      ) : {};

      setEdges((eds) =>
        addEdge(
          { ...params, ...handles, type: "custom", animated: true, style: DEFAULT_EDGE_STYLE },
          eds
        )
      );
    },
    [setEdges, getNode]
  );

  // Auto-select best handles when nodes move
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);
        if (!sourceNode || !targetNode) return edge;

        const s = {
          x: sourceNode.position.x,
          y: sourceNode.position.y,
          w: sourceNode.measured?.width ?? 250,
          h: sourceNode.measured?.height ?? 150,
        };
        const t = {
          x: targetNode.position.x,
          y: targetNode.position.y,
          w: targetNode.measured?.width ?? 250,
          h: targetNode.measured?.height ?? 150,
        };
        const { sourceHandle, targetHandle } = getBestHandle(s, t);

        if (edge.sourceHandle === sourceHandle && edge.targetHandle === targetHandle) {
          return edge;
        }
        return { ...edge, sourceHandle, targetHandle };
      })
    );
  }, [nodes, setEdges]);

  const defaultEdgeOptions = useMemo(
    () => ({ type: "custom", animated: true, style: DEFAULT_EDGE_STYLE }),
    []
  );

  const handleAddNode = useCallback(
    (type: "text" | "conceptCard" | "imageUpload" | "run" | "goalCard" | "perplexityCard" | "digitalTwin") => {
      const center = screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 100,
      });
      const offset = { x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 150 };

      const newNode: CanvasNode = {
        id: nextId(),
        type,
        position: { x: center.x + offset.x, y: center.y + offset.y },
        data: buildNodeData(type),
      } as CanvasNode;

      setNodes((nds) => [...nds, newNode]);

      // Auto-open editor for new nodes (except run nodes which are non-editable)
      // Delay to let React Flow process the new node first
      if (type !== "run") {
        requestAnimationFrame(() => openEditor(newNode.id, true));
      }
    },
    [screenToFlowPosition, setNodes, openEditor]
  );

  const chainFromRun = useCallback(
    (runNodeId: string) => {
      const runNode = getNode(runNodeId);
      if (!runNode) return;

      const runData = runNode.data as unknown as RunNodeData;
      const synthesis = runData.structuredOutput?.synthesis || runData.result || "";
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
      setEdges((eds) =>
        addEdge(
          {
            id: `e-${runNodeId}-${newNodeId}`,
            source: runNodeId,
            target: newNodeId,
            type: "custom",
            animated: true,
            style: DEFAULT_EDGE_STYLE,
          },
          eds
        )
      );
    },
    [getNode, setNodes, setEdges]
  );

  const handleLoadTemplate = useCallback(
    (template: FlowTemplate) => {
      setNodes(template.nodes);
      setEdges(template.edges);
      // Let React Flow process the new nodes before fitting view
      requestAnimationFrame(() => fitView({ padding: 0.2 }));
    },
    [setNodes, setEdges, fitView]
  );

  const gatherInputs = useCallback(
    (runNodeId: string): NodeInput[] => {
      const visited = new Set<string>();
      const inputs: NodeInput[] = [];

      function walk(nodeId: string) {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);

        const node = nodes.find((n) => n.id === nodeId);
        if (!node) return;

        if (node.type === "text") {
          const d = node.data as unknown as TextNodeData;
          if (d.text) {
            inputs.push({ nodeId: node.id, nodeType: "text", role: "context", content: d.text });
          }
        } else if (node.type === "conceptCard") {
          const d = node.data as unknown as ConceptCardData;
          if (d.title || d.description) {
            inputs.push({
              nodeId: node.id, nodeType: "conceptCard", role: "idea",
              content: `${d.title}: ${d.description}`,
              metadata: { tags: d.tags.join(", ") },
            });
          }
        } else if (node.type === "imageUpload") {
          const d = node.data as unknown as ImageUploadData;
          if (d.caption) {
            inputs.push({ nodeId: node.id, nodeType: "imageUpload", role: "evidence", content: d.caption });
          }
        } else if (node.type === "goalCard") {
          const d = node.data as unknown as GoalCardData;
          if (d.title) {
            inputs.push({
              nodeId: node.id, nodeType: "goalCard", role: "goal",
              content: `${d.title} (success: ${d.successCriteria})`,
              metadata: { priority: d.priority, timeframe: d.timeframe },
            });
          }
        } else if (node.type === "perplexityCard") {
          const d = node.data as unknown as PerplexityCardData;
          if (d.question) {
            inputs.push({
              nodeId: node.id, nodeType: "perplexityCard", role: "question",
              content: d.question,
              metadata: { isBlocking: String(d.isBlocking), ...(d.context ? { context: d.context } : {}) },
            });
          }
        } else if (node.type === "digitalTwin") {
          const d = node.data as unknown as DigitalTwinData;
          inputs.push({
            nodeId: node.id, nodeType: "digitalTwin", role: "perspective",
            content: `[${d.mode.toUpperCase()} - ${d.name || "Unnamed"}]`,
            metadata: { mode: d.mode, personality: d.personality },
          });
        } else if (node.type === "synthesisOutput") {
          const d = node.data as unknown as SynthesisOutputData;
          if (d.synthesis) {
            inputs.push({
              nodeId: node.id, nodeType: "synthesisOutput", role: "context",
              content: d.synthesis,
              metadata: { source: "previous-run-flow" },
            });
          }
        }

        const incomers = getIncomers(node, nodes, edges);
        incomers.forEach((inc) => walk(inc.id));
      }

      const runNode = nodes.find((n) => n.id === runNodeId);
      if (runNode) {
        const incomers = getIncomers(runNode, nodes, edges);
        incomers.forEach((inc) => walk(inc.id));
      }

      return inputs;
    },
    [nodes, edges]
  );

  const handleRunAI = useCallback(async () => {
    const runNodes = nodes.filter((n) => n.type === "run");
    if (runNodes.length === 0) return;

    setIsRunning(true);

    for (const runNode of runNodes) {
      const inputs = gatherInputs(runNode.id);
      if (inputs.length === 0) continue;

      // Set run node to running + twins to thinking
      const twinNodeIds = inputs.filter((i) => i.nodeType === "digitalTwin").map((i) => i.nodeId);

      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === runNode.id) {
            return { ...n, data: { ...n.data, status: "running", result: "", structuredOutput: undefined } as RunNodeData } as CanvasNode;
          }
          if (twinNodeIds.includes(n.id)) {
            return { ...n, data: { ...n.data, status: "thinking", lastResponse: "" } as DigitalTwinData } as CanvasNode;
          }
          return n;
        })
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
              return { ...n, data: { ...n.data, status: "done", result, structuredOutput } as RunNodeData } as CanvasNode;
            }
            if (twinResponses[n.id]) {
              return { ...n, data: { ...n.data, status: "done", lastResponse: twinResponses[n.id] } as DigitalTwinData } as CanvasNode;
            }
            return n;
          })
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === runNode.id) {
              return { ...n, data: { ...n.data, status: "error", result: message } as RunNodeData } as CanvasNode;
            }
            if (twinNodeIds.includes(n.id)) {
              return { ...n, data: { ...n.data, status: "idle" } as DigitalTwinData } as CanvasNode;
            }
            return n;
          })
        );
      }
    }

    setIsRunning(false);
  }, [nodes, gatherInputs, setNodes]);

  const connectModeValue = useMemo(
    () => ({ connectingFrom, hoveringNode, startConnect }),
    [connectingFrom, hoveringNode, startConnect]
  );

  const nodeEditorValue = useMemo(
    () => ({ editingNodeId, isNewNode, openEditor, closeEditor }),
    [editingNodeId, isNewNode, openEditor, closeEditor]
  );

  const chainFlowValue = useMemo(
    () => ({ chainFromRun }),
    [chainFromRun]
  );

  return (
    <ChainFlowContext value={chainFlowValue}>
    <NodeEditorContext value={nodeEditorValue}>
    <ConnectModeContext value={connectModeValue}>
      <div
        className="relative h-full w-full"
        style={{ cursor: connectingFrom ? "crosshair" : undefined }}
      >
        <ReactFlow
          nodes={connectingFrom ? styledNodes : nodes}
          edges={edges}
          onNodesChange={connectingFrom ? undefined : onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          panOnDrag={connectingFrom ? false : activeTool === "hand" ? true : [1]}
          selectionOnDrag={connectingFrom ? false : activeTool === "select"}
          nodesDraggable={!connectingFrom}
          nodesConnectable={!connectingFrom}
          elementsSelectable={!connectingFrom}
          snapToGrid
          snapGrid={SNAP_GRID}
          minZoom={0.3}
          maxZoom={2}
          fitView
          fitViewOptions={{ padding: 0.2, includeHiddenNodes: true }}
          proOptions={{ hideAttribution: true }}
          deleteKeyCode={connectingFrom ? [] : ["Backspace", "Delete"]}
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

        {/* Connection preview line */}
        {connectingFrom && <ConnectionLinePreview sourceNodeId={connectingFrom} />}


        <AmbientGlow active={isRunning} />

        {/* Overlays */}
        <CanvasToolbar activeTool={activeTool} onToolChange={setActiveTool} onLoadTemplate={handleLoadTemplate} hasContent={nodes.length > 0} />
        <PromptBar onAddNode={handleAddNode} onRunAI={handleRunAI} isRunning={isRunning} />
        <StatusBar
          zoom={viewport.zoom}
          onZoomIn={() => zoomIn()}
          onZoomOut={() => zoomOut()}
          onFitView={() => fitView({ padding: 0.1 })}
        />
        <NodeEditDrawer />
      </div>
    </ConnectModeContext>
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
