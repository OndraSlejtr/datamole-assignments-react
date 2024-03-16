import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TodoList } from "./TodoList";
import { useGetTodos } from "./hooks/api/useGetTodos";
import { useAddTodo } from "./hooks/api/useAddTodo";
import { Layout } from "../../components/Layout";
import { sortTodosByCompletionAndCreationDesc } from "./util/sorting";

export const TodoTracker = () => {
    const { data: todos, isFetching, failureCount, isSuccess } = useGetTodos();
    const { mutate: addTodo } = useAddTodo();

    const doneItems = todos?.filter((todo) => todo.isDone).length;
    const todoItems = todos?.filter((todo) => !todo.isDone).length;

    return (
        <>
            <Layout>
                <Header
                    onItemAdd={(label) => {
                        addTodo(label);
                    }}
                >
                    To Do app
                </Header>

                {isFetching && failureCount > 0 && <p>Loading data...</p>}
                {isSuccess && (
                    <TodoList items={todos} sortFn={sortTodosByCompletionAndCreationDesc} />
                )}

                <Footer doneItems={doneItems} todoItems={todoItems} />
            </Layout>
        </>
    );
};
