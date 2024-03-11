import { List } from "../../components/List";
import { ListItem } from "../../components/ListItem";
import { TodoItem } from "../../types/todo";
import { useEditTodo } from "./hooks/useEditTodo";

type TodoListProps = {
    items: TodoItem[];
    showErrorFn: (error: string) => void;
};

export const TodoList = ({ items, showErrorFn }: TodoListProps) => {
    const { mutate: editTodo } = useEditTodo(showErrorFn);

    return (
        <List>
            {items.map((item) => (
                <ListItem
                    {...item}
                    onItemDelete={() => {
                        console.error("Unimplemented");
                    }}
                    onItemDoneToggle={() => {
                        console.error("Unimplemented");
                    }}
                    onItemLabelEdit={(newLabel: string) => {
                        editTodo({ newLabel, oldTodo: item });
                    }}
                    key={item.id}
                ></ListItem>
            ))}
        </List>
    );
};
