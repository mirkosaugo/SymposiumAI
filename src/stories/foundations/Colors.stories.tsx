import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/* ------------------------------------------------------------------ */
/*  Color Swatch                                                      */
/* ------------------------------------------------------------------ */

function Swatch({
  name,
  variable,
  className,
}: {
  name: string;
  variable: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`h-16 w-full rounded-xl border border-border shadow-sm ${className ?? ""}`}
        style={{ backgroundColor: `var(${variable})` }}
      />
      <p className="text-xs font-medium text-foreground">{name}</p>
      <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
    </div>
  );
}

function SwatchGroup({
  title,
  swatches,
}: {
  title: string;
  swatches: { name: string; variable: string; className?: string }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {swatches.map((s) => (
          <Swatch key={s.variable} {...s} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Palette Page                                                       */
/* ------------------------------------------------------------------ */

function ColorPalette() {
  return (
    <div className="w-full max-w-5xl space-y-10 bg-background p-8 text-foreground">
      <div>
        <h1 className="text-2xl font-bold">Color System</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All colors use the OKLCH color space to ensure perceptual
          uniformity. Every token automatically adapts to light and dark
          mode.
        </p>
      </div>

      <SwatchGroup
        title="Core"
        swatches={[
          { name: "Background", variable: "--background" },
          { name: "Foreground", variable: "--foreground" },
          { name: "Primary", variable: "--primary" },
          { name: "Primary FG", variable: "--primary-foreground" },
          { name: "Secondary", variable: "--secondary" },
          { name: "Secondary FG", variable: "--secondary-foreground" },
        ]}
      />

      <SwatchGroup
        title="Semantic"
        swatches={[
          { name: "Muted", variable: "--muted" },
          { name: "Muted FG", variable: "--muted-foreground" },
          { name: "Accent", variable: "--accent" },
          { name: "Accent FG", variable: "--accent-foreground" },
          { name: "Destructive", variable: "--destructive" },
        ]}
      />

      <SwatchGroup
        title="Surface & Chrome"
        swatches={[
          { name: "Card", variable: "--card" },
          { name: "Card FG", variable: "--card-foreground" },
          { name: "Popover", variable: "--popover" },
          { name: "Popover FG", variable: "--popover-foreground" },
          { name: "Border", variable: "--border" },
          { name: "Input", variable: "--input" },
          { name: "Ring", variable: "--ring" },
        ]}
      />

      <SwatchGroup
        title="Glass & Canvas"
        swatches={[
          { name: "Glass BG", variable: "--glass-bg" },
          { name: "Glass Border", variable: "--glass-border" },
          { name: "Node BG", variable: "--node-bg" },
          { name: "Node Border", variable: "--node-border" },
        ]}
      />

      <SwatchGroup
        title="Sidebar"
        swatches={[
          { name: "Sidebar", variable: "--sidebar" },
          { name: "Sidebar FG", variable: "--sidebar-foreground" },
          { name: "Sidebar Primary", variable: "--sidebar-primary" },
          { name: "Sidebar Accent", variable: "--sidebar-accent" },
          { name: "Sidebar Border", variable: "--sidebar-border" },
        ]}
      />

      <SwatchGroup
        title="Chart"
        swatches={[
          { name: "Chart 1", variable: "--chart-1" },
          { name: "Chart 2", variable: "--chart-2" },
          { name: "Chart 3", variable: "--chart-3" },
          { name: "Chart 4", variable: "--chart-4" },
          { name: "Chart 5", variable: "--chart-5" },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Palette: Story = {
  render: () => <ColorPalette />,
};
