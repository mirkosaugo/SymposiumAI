import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    layout: "centered",
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Colors", "Typography", "Spacing & Radius", "Icons"],
          "Design Tokens",
          ["Glass Morphism", "Node Colors"],
          "Components",
          ["Button", "Input", "Badge", "Avatar", "Tooltip", "Separator", "Sheet", "DropdownMenu"],
        ],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        Light: "",
        Dark: "dark",
      },
      defaultTheme: "Dark",
      parentSelector: "html",
    }),
  ],
};

export default preview;
