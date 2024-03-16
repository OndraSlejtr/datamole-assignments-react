import { List } from "../../components/List";
import { ListItem } from "../../components/ListItem";
import { TodoItem } from "../../types/todo";
import { useDeleteTodo } from "./hooks/api/useDeleteTodo";
import { useEditTodo } from "./hooks/api/useEditTodo";
import { useUpdateTodoStatus } from "./hooks/api/useUpdateTodoStatus";

type TodoListProps = {
    items: TodoItem[];
    sortFn: (element1: TodoItem, element2: TodoItem) => number;
};

export const TodoList = ({ items, sortFn }: TodoListProps) => {
    const { mutate: editTodo } = useEditTodo();
    const { mutate: updateTodoStatus } = useUpdateTodoStatus();
    const { mutate: deleteTodo } = useDeleteTodo();

    return (
        <List>
            {items.toSorted(sortFn).map((item) => (
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
