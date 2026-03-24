import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, Eye } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "file"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter text...",
    disabled: false,
    type: "text",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <label className="text-base font-medium text-foreground mb-1 block">Email</label>
      <Input type="email" placeholder="name@company.com" />
      <p className="text-xs text-muted-foreground">
        Your work email
      </p>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Default</label>
        <Input placeholder="Placeholder..." />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Disabled</label>
        <Input placeholder="Disabled" disabled />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Invalid</label>
        <Input placeholder="Invalid field" aria-invalid="true" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">File</label>
        <Input type="file" />
      </div>
    </div>
  ),
};

export const WithIconComposition: Story = {
  name: "Icon Compositions",
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-8" placeholder="Search..." />
      </div>
      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-8" type="email" placeholder="name@company.com" />
      </div>
      {/* Password with button */}
      <div className="relative">
        <Input type="password" placeholder="Password" className="pr-10" />
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          <Eye className="size-3.5" />
        </Button>
      </div>
    </div>
  ),
};
