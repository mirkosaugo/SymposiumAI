import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function TypeRow({
  label,
  className,
  sample,
}: {
  label: string;
  className: string;
  sample?: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-border pb-4">
      <span className="font-mono text-[10px] text-muted-foreground">
        {label}
      </span>
      <p className={className}>
        {sample ?? "The quick brown fox jumps over the lazy dog"}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function TypographyPage() {
  return (
    <div className="w-full max-w-4xl space-y-10 bg-background p-8 text-foreground">
      <div>
        <h1 className="text-2xl font-bold">Typography</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The design system uses <strong>Satoshi</strong> as the primary
          font (sans and heading) and <strong>Geist Mono</strong> for code.
          Available weights: 400, 500, 600, 700.
        </p>
      </div>

      {/* Font Family */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Font Family</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-5">
            <p className="font-mono text-[10px] text-muted-foreground">
              font-sans / font-heading
            </p>
            <p className="mt-2 font-sans text-xl font-semibold">
              Satoshi
            </p>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              AaBbCcDdEeFf 0123456789
            </p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <p className="font-mono text-[10px] text-muted-foreground">
              font-mono
            </p>
            <p className="mt-2 font-mono text-xl font-semibold">
              Geist Mono
            </p>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              AaBbCcDdEeFf 0123456789
            </p>
          </div>
        </div>
      </div>

      {/* Scale */}
      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-foreground">Type Scale</h3>
        <TypeRow label="text-xs  (12px)" className="text-xs" />
        <TypeRow label="text-sm  (14px)" className="text-sm" />
        <TypeRow label="text-base (16px)" className="text-base" />
        <TypeRow label="text-lg  (18px)" className="text-lg" />
        <TypeRow label="text-xl  (20px)" className="text-xl" />
        <TypeRow label="text-2xl (24px)" className="text-2xl" />
        <TypeRow label="text-3xl (30px)" className="text-3xl font-bold" />
        <TypeRow label="text-4xl (36px)" className="text-4xl font-bold" />
      </div>

      {/* Weights */}
      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-foreground">Font Weights</h3>
        <TypeRow label="font-normal (400)" className="text-lg font-normal" sample="Regular weight — body text" />
        <TypeRow label="font-medium (500)" className="text-lg font-medium" sample="Medium weight — labels, captions" />
        <TypeRow label="font-semibold (600)" className="text-lg font-semibold" sample="Semibold weight — section titles" />
        <TypeRow label="font-bold (700)" className="text-lg font-bold" sample="Bold weight — headings, emphasis" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const TypeScale: Story = {
  render: () => <TypographyPage />,
};
