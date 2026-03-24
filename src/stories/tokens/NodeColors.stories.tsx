import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NODE_COLORS } from "@/config/constants";
import { tintBg } from "@/lib/node-style";
import {
  Type,
  Lightbulb,
  ImageIcon,
  Play,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Node Swatch                                                        */
/* ------------------------------------------------------------------ */

const nodeTypes = [
  {
    key: "text" as const,
    label: "Text Node",
    icon: Type,
    description: "Editable text node for annotations and notes",
  },
  {
    key: "conceptCard" as const,
    label: "Concept Card",
    icon: Lightbulb,
    description: "Structured card with title, description, and tags",
  },
  {
    key: "imageUpload" as const,
    label: "Image Node",
    icon: ImageIcon,
    description: "Image upload and display",
  },
  {
    key: "run" as const,
    label: "Run Node",
    icon: Play,
    description: "AI execution with prompt and output",
  },
];

function NodeSwatch({
  nodeKey,
  label,
  icon: Icon,
  description,
}: {
  nodeKey: keyof typeof NODE_COLORS;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}) {
  const color = NODE_COLORS[nodeKey];

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--node-border)",
        backgroundColor: "var(--node-bg)",
        borderLeftWidth: 4,
        borderLeftColor: color,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: tintBg(color, 0.15) }}
      >
        <div
          className="flex h-6 w-6 items-center justify-center rounded-md"
          style={{ background: tintBg(color, 0.25) }}
        >
          <Icon className="size-3.5" style={{ color }} />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>

      {/* Body */}
      <div className="space-y-2 px-4 py-3">
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-mono text-[10px] text-muted-foreground">
            {color}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function NodeColorsPage() {
  return (
    <div className="w-full max-w-4xl space-y-10 bg-background p-8 text-foreground">
      <div>
        <h1 className="text-2xl font-bold">Node Colors</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Each node type on the canvas has an identifying color used
          for the left border, tinted header, and selection glow.
        </p>
      </div>

      {/* Swatches */}
      <div className="grid gap-4 sm:grid-cols-2">
        {nodeTypes.map((n) => (
          <NodeSwatch
            key={n.key}
            nodeKey={n.key}
            label={n.label}
            icon={n.icon}
            description={n.description}
          />
        ))}
      </div>

      {/* Color map table */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Color Map</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="pb-2 font-medium">Token</th>
              <th className="pb-2 font-medium">Hex</th>
              <th className="pb-2 font-medium">Usage</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {Object.entries(NODE_COLORS).map(([key, hex]) => (
              <tr key={key} className="border-b border-border/50">
                <td className="py-2 font-mono text-xs">{key}</td>
                <td className="py-2">
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="font-mono text-xs">{hex}</span>
                  </span>
                </td>
                <td className="py-2 text-xs text-muted-foreground">
                  Left border, header tint, selection glow
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: "Design Tokens/Node Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <NodeColorsPage />,
};
