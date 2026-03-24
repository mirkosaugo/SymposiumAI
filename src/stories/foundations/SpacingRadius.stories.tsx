import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/* ------------------------------------------------------------------ */
/*  Radius                                                             */
/* ------------------------------------------------------------------ */

const radii = [
  { name: "radius-sm", calc: "calc(0.875rem * 0.6)", label: "~8px" },
  { name: "radius-md", calc: "calc(0.875rem * 0.8)", label: "~11px" },
  { name: "radius-lg", calc: "0.875rem", label: "14px (base)" },
  { name: "radius-xl", calc: "calc(0.875rem * 1.4)", label: "~20px" },
  { name: "radius-2xl", calc: "calc(0.875rem * 1.8)", label: "~25px" },
  { name: "radius-3xl", calc: "calc(0.875rem * 2.2)", label: "~31px" },
  { name: "radius-4xl", calc: "calc(0.875rem * 2.6)", label: "~36px" },
];

function RadiusCard({ name, calc, label }: (typeof radii)[number]) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-16 w-24 shrink-0 border-2 border-foreground/20 bg-primary/10"
        style={{ borderRadius: calc }}
      />
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spacing                                                            */
/* ------------------------------------------------------------------ */

const spacings = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function SpacingRadiusPage() {
  return (
    <div className="w-full max-w-4xl space-y-10 bg-background p-8 text-foreground">
      <div>
        <h1 className="text-2xl font-bold">Spacing & Radius</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Border radius scale derived from the base variable{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            --radius: 0.875rem
          </code>
          . Spacing follows the Tailwind 4px scale.
        </p>
      </div>

      {/* Radius */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Border Radius Scale</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {radii.map((r) => (
            <RadiusCard key={r.name} {...r} />
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Spacing Scale (4px base)</h3>
        <div className="space-y-2">
          {spacings.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                {s}
              </span>
              <div
                className="h-3 rounded-sm bg-primary/60"
                style={{ width: `${s * 4}px` }}
              />
              <span className="font-mono text-[10px] text-muted-foreground">
                {s * 4}px
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Canvas Snap Grid</h3>
        <p className="text-sm text-muted-foreground">
          Nodes on the canvas snap to a{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            16 x 16 px
          </code>
{" "}grid.
        </p>
        <div className="inline-grid h-32 w-64 grid-cols-4 grid-rows-2 rounded-lg border border-border">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border border-dashed border-border/50" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: "Foundations/Spacing & Radius",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <SpacingRadiusPage />,
};
