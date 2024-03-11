import { useMutation } from "react-query";
import { API_URL } from "../../../config";
import { TodoItem } from "../../../types/todo";
import { TODO_QUERY_KEY } from "./queries";
import { queryClient } from "../../../query.client";

const deleteTodo = async (todo: TodoItem): Promise<TodoItem> => {
    console.log(`deleting ${JSON.stringify(todo)}`);

    const res = await fetch(`${API_URL}/items/${todo.id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(`Failed to delete Todo item.`);
    }

    return res.json();
};

export const useDeleteTodo = (displayMessageFn: (text: string) => void) => {
    return useMutation(deleteTodo, {
        onError: () => displayMessageFn("Error deleting todo. 😔"),
        onSuccess: async (deletedTodo, context) => {
            queryClient.setQueryData(TODO_QUERY_KEY, (oldTodos: TodoItem[] | undefined) => {
                const index = oldTodos?.findIndex((todo) => todo.id === context.id);

                console.log(`Deleting at index ${index}`);

                if (index !== undefined && index >= 0) {
                    return oldTodos?.toSpliced(index, 1);
                } else {
                    return oldTodos;
                }
            });
        },
    });
};
