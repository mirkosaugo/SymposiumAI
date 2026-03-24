import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Separator } from "@/components/ui/separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <p className="text-sm font-medium text-foreground">Upper section</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Lower section</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm text-foreground">Item A</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-foreground">Item B</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-foreground">Item C</span>
    </div>
  ),
};

export const InContent: Story = {
  name: "In Content Block",
  render: () => (
    <div className="w-72 rounded-xl border border-border p-4">
      <h4 className="text-sm font-semibold text-foreground">Section Title</h4>
      <p className="mt-1 text-xs text-muted-foreground">
        Brief content description
      </p>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Status</span>
        <span className="font-medium text-foreground">Active</span>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Last update</span>
        <span className="font-medium text-foreground">2 hours ago</span>
      </div>
    </div>
  ),
};
