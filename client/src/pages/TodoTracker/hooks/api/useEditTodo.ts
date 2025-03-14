import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../../config";
import { TodoItem } from "../../../../types/todo";
import { TODO_QUERY_KEY } from "./queries";

type todoEditDetails = {
    newLabel: string;
    oldTodo: TodoItem;
};

const editTodo = async ({ newLabel, oldTodo }: todoEditDetails): Promise<TodoItem> => {
    const res = await fetch(`${API_URL}/items/${oldTodo.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newLabel }),
    });

    if (!res.ok) {
        throw new Error(`Failed to edit Todo item (${oldTodo.label} -> ${newLabel}).`);
    }

    return res.json();
};

export const useEditTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editTodo,
        meta: {
            errorMessage: "Error editing todo. 😔",
        },
        onSuccess: async (editedTodo: TodoItem) => {
            queryClient.setQueryData(TODO_QUERY_KEY, (oldTodos: TodoItem[] | undefined) => {
                const index = oldTodos?.findIndex((todo) => todo.id === editedTodo.id);

                if (index !== undefined && index >= 0) {
                    return oldTodos?.toSpliced(index, 1, editedTodo);
                } else {
                    return oldTodos;
                }
            });
        },
    });
};
