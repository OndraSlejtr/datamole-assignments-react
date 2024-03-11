import { useMutation } from "react-query";
import { API_URL } from "../../../config";
import { TodoItem } from "../../../types/todo";
import { TODO_QUERY_KEY } from "./queries";
import { queryClient } from "../../../query.client";

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

export const useEditTodo = (displayMessageFn: (text: string) => void) => {
    return useMutation(editTodo, {
        onError: () => displayMessageFn("Error editing todo. 😔"),
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
