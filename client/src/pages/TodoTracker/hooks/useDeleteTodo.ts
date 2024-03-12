import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { TodoItem } from "../../../types/todo";
import { TODO_QUERY_KEY } from "./queries";
import { queryClient } from "../../../query.client";

const deleteTodo = async (todo: TodoItem): Promise<TodoItem> => {
    const res = await fetch(`${API_URL}/items/${todo.id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(`Failed to delete Todo item.`);
    }

    return res.json();
};

export const useDeleteTodo = (displayMessageFn: (text: string) => void) => {
    return useMutation({
        mutationFn: deleteTodo,
        onError: () => displayMessageFn("Error deleting todo. 😔"),
        onSuccess: async (_: TodoItem, sentTodo: TodoItem) => {
            queryClient.setQueryData(TODO_QUERY_KEY, (oldTodos: TodoItem[] | undefined) => {
                const index = oldTodos?.findIndex((todo) => todo.id === sentTodo.id);

                if (index !== undefined && index >= 0) {
                    return oldTodos?.toSpliced(index, 1);
                } else {
                    return oldTodos;
                }
            });
        },
    });
};
