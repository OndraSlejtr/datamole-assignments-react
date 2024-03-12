import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config";
import { TodoItem } from "../../../types/todo";
import { TODO_QUERY_KEY } from "./queries";

const fetchTodos = async (): Promise<TodoItem[]> => {
    const res = await fetch(`${API_URL}/items`);
    if (!res.ok) {
        throw new Error("Failed to fetch list of Todo items.");
    }

    return res.json();
};

export const useGetTodos = () => {
    return useQuery({
        queryKey: TODO_QUERY_KEY,
        queryFn: fetchTodos,
        initialData: [],
    });
};
