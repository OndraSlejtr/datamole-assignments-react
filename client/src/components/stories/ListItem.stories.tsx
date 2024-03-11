import { Meta, StoryObj } from "@storybook/react";

import { ListItem } from "../ListItem";

const meta = {
    title: "List Item",
    component: ListItem,
    argTypes: {
        onItemDelete: { action: "removed" },
        onItemLabelEdit: { action: "edited" },
    },
    parameters: { viewport: { defaultViewport: "tablet" } },
} as Meta<typeof ListItem>;
export default meta;
type Story = StoryObj<typeof ListItem>;
export const ToDo: Story = {
    args: {
        label: "Lorem ipsum dolor",
    },
};
export const Done: Story = {
    args: {
        ...ToDo.args,
        isDone: true,
    },
};

export const OnHover: Story = {
    args: {
        ...ToDo.args,
        isDone: true,
    },
    parameters: { docs: { description: { story: "When hovered, ListItem display action card to the right." } } },
};

OnHover.parameters = {
    pseudo: { hover: ['div'] },
};
