import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GLASS_CONTAINER_CLASS, ICON_BTN_CLASS } from "@/config/constants";
import { Settings, Plus, Minus, Maximize2, HelpCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Demo Components                                                    */
/* ------------------------------------------------------------------ */

function GlassCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}

function GlassMorphismPage() {
  return (
    <div className="w-full max-w-4xl space-y-10 bg-background p-8 text-foreground">
      <div>
        <h1 className="text-2xl font-bold">Glass Morphism</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pattern used for toolbars, overlays, and floating controls. Combines
          transparency, blur, and shadow to create depth.
        </p>
      </div>

      {/* Token Reference */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">CSS Variables</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-3">
            <p className="font-mono text-[10px] text-muted-foreground">
              --glass-bg
            </p>
            <p className="mt-1 text-xs text-foreground">
              Light: rgba(255,255,255,0.5) / Dark: rgba(255,255,255,0.06)
            </p>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="font-mono text-[10px] text-muted-foreground">
              --glass-border
            </p>
            <p className="mt-1 text-xs text-foreground">
              Light: oklch(0 0 0/10%) / Dark: oklch(1 0 0/10%)
            </p>
          </div>
        </div>
      </div>

      {/* Live Examples */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-8">
        {/* Dot pattern replicating the canvas */}
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dot-grid"
              x="0"
              y="0"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="8" cy="8" r="1" className="fill-dot-pattern" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>

        {/* Background elements to demonstrate blur */}
        <div className="absolute left-12 top-10 h-24 w-32 rounded-2xl border-4 border-[#A78BFA]" />
        <div className="absolute right-20 top-16 h-20 w-28 rounded-2xl border-4 border-[#38BDF8]" />
        <div className="absolute bottom-8 left-1/3 h-20 w-36 rounded-2xl border-4 border-[#34D399]" />

        <div className="relative flex flex-wrap items-start gap-6">
          {/* Rounded pill toolbar */}
          <GlassCard title="" description="">
            <div
              className={`${GLASS_CONTAINER_CLASS} flex items-center gap-2 rounded-full p-1.5`}
            >
              <button className={ICON_BTN_CLASS}>
                <Plus className="size-4" />
              </button>
              <button className={ICON_BTN_CLASS}>
                <Minus className="size-4" />
              </button>
              <button className={ICON_BTN_CLASS}>
                <Maximize2 className="size-4" />
              </button>
            </div>
          </GlassCard>

          {/* Rounded card */}
          <GlassCard title="" description="">
            <div className={`${GLASS_CONTAINER_CLASS} rounded-2xl p-4`}>
              <p className="text-sm font-medium text-foreground">
                Glass Container
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                backdrop-blur-2xl + bg transparency
              </p>
            </div>
          </GlassCard>

          {/* Icon buttons */}
          <GlassCard title="" description="" className="ml-auto mr-8">
            <div
              className={`${GLASS_CONTAINER_CLASS} flex flex-col items-center gap-2 rounded-full p-1.5`}
            >
              <button className={ICON_BTN_CLASS}>
                <Settings className="size-4" />
              </button>
              <button className={ICON_BTN_CLASS}>
                <HelpCircle className="size-4" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Class reference */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Utility Classes
        </h3>
        <div className="space-y-2">
          <div className="rounded-lg border border-border p-3">
            <p className="font-mono text-[10px] text-muted-foreground">
              GLASS_CONTAINER_CLASS
            </p>
            <code className="mt-1 block text-xs text-foreground">
              {GLASS_CONTAINER_CLASS}
            </code>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="font-mono text-[10px] text-muted-foreground">
              ICON_BTN_CLASS
            </p>
            <code className="mt-1 block text-xs text-foreground">
              {ICON_BTN_CLASS}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: "Design Tokens/Glass Morphism",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <GlassMorphismPage />,
};
