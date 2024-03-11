import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { Layout } from "../Layout";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { List } from "../List";
import { ListItem, ListItemProp } from "../ListItem";

const meta = {
    title: "Layout",
    component: Layout,
} as Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof Layout>;

const emptyHandlers: Pick<ListItemProp, "onItemLabelEdit" | "onItemDoneToggle" | "onItemDelete"> = {
    onItemLabelEdit: action("Edit requested"),
    onItemDoneToggle: action("Done state change requested"),
    onItemDelete: action("Removal requested"),
};

export const EmptyLayout: Story = {};

export const FilledLayout: Story = {
    args: {
        children: [
            <>
                <Header onItemAdd={action("Add new todo")}>Header</Header>
                <List>
                    <ListItem {...emptyHandlers} label={"Lorem ipsum dolor"} isDone={false} />,
                    <ListItem {...emptyHandlers} label={"Nullam Adipiscing Ridiculus Fusce"} isDone={false} />,
                </List>
                <Footer></Footer>
            </>,
        ],
    },
};
