import { useMutation } from "react-query";
import { API_URL } from "../../../config";
import { TodoItem } from "../../../types/todo";
import { TODO_QUERY_KEY } from "./queries";
import { queryClient } from "../../../query.client";

const updateTodoStatus = async (oldTodo: TodoItem): Promise<TodoItem> => {
    const res = await fetch(`${API_URL}/items/${oldTodo.id}/completion`, {
        method: "PUT"
    });

    if (!res.ok) {
        throw new Error(`Failed to update done status of todo.`);
    }

    return res.json();
};

export const useUpdateTodoStatus = (displayMessageFn: (text: string) => void) => {
    return useMutation(updateTodoStatus, {
        onError: () => displayMessageFn("Error updating todo status. 😔"),
        onSuccess: async (editedTodo) => {
            queryClient.setQueryData(TODO_QUERY_KEY, (oldTodos: TodoItem[] | undefined) => {
                const id = oldTodos?.findIndex((todo) => todo.id === editedTodo.id);

                if (id !== undefined) {
                    return oldTodos?.toSpliced(id, 1, editedTodo);
                } else {
                    return oldTodos;
                }
            });
        },
    });
};
