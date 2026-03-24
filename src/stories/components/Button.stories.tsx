import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Loader2, Mail, Download } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "glass",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="glass">Glass</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-xs"><Plus /></Button>
      <Button size="icon-sm"><Plus /></Button>
      <Button size="icon"><Plus /></Button>
      <Button size="icon-lg"><Plus /></Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Mail data-icon="inline-start" />
        Send Email
      </Button>
      <Button variant="outline">
        Download
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button variant="secondary">
        <Download data-icon="inline-start" />
        Export
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Loader2 className="animate-spin" />
        Please wait...
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="animate-spin" />
        Loading
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Default</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
};

export const GlassOnGradient: Story = {
  render: () => (
    <div
      className="flex items-center gap-3 rounded-2xl p-8"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Button variant="glass">Glass Button</Button>
      <Button variant="glass" size="sm">Small Glass</Button>
      <Button variant="glass" size="icon"><Plus /></Button>
    </div>
  ),
};
