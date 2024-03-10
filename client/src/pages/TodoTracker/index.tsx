import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TodoList } from "./TodoList";
import { useGetTodos } from "./hooks/useGetTodos";


export const TodoTracker = () => {
    const [error, setError] = useState({ message: "", timestamp: 0 });
    const addError = (message: string) => setError({ message, timestamp: Date.now() });

    const { data: todos, isFetching, failureCount, isSuccess } = useGetTodos(addError);
    const doneItems = todos?.filter((todo) => todo.isDone).length;
    const todoItems = todos?.filter((todo) => !todo.isDone).length;

    return (
        <>
                {isFetching && failureCount > 0 && <p>Loading data...</p>}
                {isSuccess && <TodoList items={todos} />}

                <Footer doneItems={doneItems} todoItems={todoItems} />
        </>
    );
};
