import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/badge";
import { Circle, X, AlertTriangle, Check } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
  },
  args: {
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <Circle className="size-2 fill-current" data-icon="inline-start" />
        Online
      </Badge>
      <Badge variant="destructive">
        <AlertTriangle data-icon="inline-start" />
        Error
      </Badge>
      <Badge variant="secondary">
        <Check data-icon="inline-start" />
        Completed
      </Badge>
      <Badge variant="outline">
        Tag
        <X data-icon="inline-end" />
      </Badge>
    </div>
  ),
};

export const StatusIndicators: Story = {
  name: "Status Indicators",
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
        <Circle className="size-1.5 fill-current" /> Active
      </Badge>
      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
        <Circle className="size-1.5 fill-current" /> Pending
      </Badge>
      <Badge variant="destructive">
        <Circle className="size-1.5 fill-current" /> Error
      </Badge>
      <Badge variant="secondary">
        <Circle className="size-1.5 fill-current" /> Idle
      </Badge>
    </div>
  ),
};

export const NodeTags: Story = {
  name: "Node Tags (Canvas Pattern)",
  render: () => (
    <div className="flex flex-wrap items-center gap-1.5">
      <Badge variant="secondary" className="text-[10px] h-4">design</Badge>
      <Badge variant="secondary" className="text-[10px] h-4">branding</Badge>
      <Badge variant="secondary" className="text-[10px] h-4">UI/UX</Badge>
      <Badge variant="outline" className="text-[10px] h-4 border-dashed">+ add</Badge>
    </div>
  ),
};
