import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { Pencil1Icon } from "@radix-ui/react-icons";

const meta = {
    title: "Button",
    component: Button,
    argTypes: {
        onClick: { action: "clicked" },
    },
} as Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonSymbolOnly: Story = {
    args: {
        children: [<Pencil1Icon />],
        $symbolonly: true,
    },
};

export const ButtonText: Story = {
    args: {
        children: ["Button content"],
        $symbolonly: false,
    },
};

export const ButtonInfo: Story = {
    args: {
        children: ["Info content"],
        $symbolonly: false,
        color: "info",
    },
};

export const ButtonSuccess: Story = {
    args: {
        children: ["Warning"],
        $symbolonly: false,
        color: "warning",
    },
};

export const ButtonError: Story = {
    args: {
        children: ["Success"],
        $symbolonly: false,
        color: "success",
    },
};
