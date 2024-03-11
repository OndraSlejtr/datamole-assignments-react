import { List } from "../../components/List";
import { ListItem } from "../../components/ListItem";
import { TodoItem } from "../../types/todo";
import { useDeleteTodo } from "./hooks/useDeleteTodo";
import { useEditTodo } from "./hooks/useEditTodo";
import { useUpdateTodoStatus } from "./hooks/useUpdateTodoStatus";

type TodoListProps = {
    items: TodoItem[];
    showErrorFn: (error: string) => void;
    sortFn: (element1: TodoItem, element2: TodoItem) => number;
};

export const TodoList = ({ items, sortFn, showErrorFn }: TodoListProps) => {
    const { mutate: editTodo } = useEditTodo(showErrorFn);
    const { mutate: updateTodoStatus } = useUpdateTodoStatus(showErrorFn);
    const { mutate: deleteTodo } = useDeleteTodo(showErrorFn);

    return (
        <List>
            {items.map((item) => (
                <ListItem
                    {...item}
                    onItemDelete={() => {
                        deleteTodo(item);
                    }}
                    onItemDoneToggle={() => {
                        updateTodoStatus(item);
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
