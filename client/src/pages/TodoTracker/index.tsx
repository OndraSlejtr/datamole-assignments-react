import { useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TodoList } from "./TodoList";
import { useGetTodos } from "./hooks/useGetTodos";
import { useAddTodo } from "./hooks/useAddTodo";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { Layout } from "../../components/Layout";

export const TodoTracker = () => {
    const [error, setError] = useState({ message: "", timestamp: 0 });
    const addError = (message: string) => setError({ message, timestamp: Date.now() });

    const { data: todos, isFetching, failureCount, isSuccess } = useGetTodos(addError);
    const { mutate: addTodo, ...addingTodos } = useAddTodo(addError);

    const doneItems = todos?.filter((todo) => todo.isDone).length;
    const todoItems = todos?.filter((todo) => !todo.isDone).length;

    return (
        <>
            <ErrorDisplay error={error.message} key={error.timestamp} />
            <Layout>
                <Header
                    onItemAdd={(label) => {
                        addTodo(label);
                    }}
                >
                    To Do app
                </Header>

                {isFetching && failureCount > 0 && <p>Loading data...</p>}
                {isSuccess && <TodoList items={todos} />}

                <Footer doneItems={doneItems} todoItems={todoItems} />
            </Layout>
        </>
    );
};
