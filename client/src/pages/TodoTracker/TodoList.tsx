import { List } from "../../components/List";
import { ListItem } from "../../components/ListItem";
import { TodoItem } from "../../types/todo";

type TodoListProps = {
    items: TodoItem[];
};

export const TodoList = ({ items }: TodoListProps) => {
    return (
        <List>
            {items.map((item) => (
                <ListItem
                    {...item}
                    onItemDelete={() => {console.error("Unimplemented")}}
                    onItemDoneToggle={() => {console.error("Unimplemented")}}
                    onItemLabelEdit={() => {console.error("Unimplemented")}}
                    key={item.id}
                ></ListItem>
            ))}
        </List>
    );
};
