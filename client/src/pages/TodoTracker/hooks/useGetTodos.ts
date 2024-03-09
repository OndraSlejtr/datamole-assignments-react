import { useQuery } from "react-query";
import { API_URL } from "../../../config";
import { TodoItem } from "../../../types/todo";
import { QUERY_KEY } from "./queries";

const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/items`);
    return res.json();
};

export const useGetTodos = () => {
    return useQuery<TodoItem[], Error>(QUERY_KEY, fetchTodos);
}
