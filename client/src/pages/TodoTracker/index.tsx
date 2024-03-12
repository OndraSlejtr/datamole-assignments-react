import { useEffect } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TodoList } from "./TodoList";
import { useGetTodos } from "./hooks/api/useGetTodos";
import { useAddTodo } from "./hooks/api/useAddTodo";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { Layout } from "../../components/Layout";
import { useErrorMessage } from "./hooks/useErrorMessage";
import { sortTodosByCompletionAndCreationDesc } from "./util/sorting";

export const TodoTracker = () => {
    const { errorMessage, addError } = useErrorMessage();
    const { data: todos, isFetching, failureCount, isSuccess, error } = useGetTodos();
    const { mutate: addTodo } = useAddTodo(addError);

    const doneItems = todos?.filter((todo) => todo.isDone).length;
    const todoItems = todos?.filter((todo) => !todo.isDone).length;

    // This is unoptimal workaround compared to using global callback in Query on Client level
    // but that would require smarter ErrorDisplay implementation and thus more time.
    useEffect(() => {
        if (error) {
            addError("Error loading data. 😔");
        }
    }, [error]);

    return (
        <>
            <ErrorDisplay error={errorMessage.message} key={errorMessage.timestamp} />
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
                    <TodoList items={todos} showErrorFn={addError} sortFn={sortTodosByCompletionAndCreationDesc} />
                )}

                <Footer doneItems={doneItems} todoItems={todoItems} />
            </Layout>
        </>
    );
};
