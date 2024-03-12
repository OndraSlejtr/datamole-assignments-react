import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { TodoItem } from "../../../types/todo";
import { TODO_QUERY_KEY } from "./queries";
import { queryClient } from "../../../query.client";

const postTodo = async (label: string): Promise<TodoItem> => {
    const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ label }),
    });

    if (!res.ok) {
        throw new Error("Failed to add new Todo item.");
    }

    return res.json();
};

export const useAddTodo = (displayMessageFn: (text: string) => void) => {
    return useMutation({
        mutationFn: postTodo,
        onError: () => displayMessageFn("Error adding new todo. 😔"),
        onSuccess: async (newTodo: TodoItem) => {
            queryClient.setQueryData(TODO_QUERY_KEY, (oldTodos: TodoItem[] | undefined) =>
                oldTodos ? [...oldTodos, newTodo] : [newTodo]
            );
        },
    });
};
