import { useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TodoList } from "./TodoList";
import { useGetTodos } from "./hooks/useGetTodos";
import { useAddTodo } from "./hooks/useAddTodo";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { Layout } from "../../components/Layout";
import { TodoItem } from "../../types/todo";

export const TodoTracker = () => {
    const [error, setError] = useState({ message: "", timestamp: 0 });
    const addError = (message: string) => setError({ message, timestamp: Date.now() });

    const { data: todos, isFetching, failureCount, isSuccess } = useGetTodos(addError);
    const { mutate: addTodo } = useAddTodo(addError);

    const doneItems = todos?.filter((todo) => todo.isDone).length;
    const todoItems = todos?.filter((todo) => !todo.isDone).length;

    const sortByCompletionAndCreationDesc = (todo1: TodoItem, todo2: TodoItem) => {
        if (todo1.isDone === todo2.isDone) {
            return todo2.createdAt - todo1.createdAt;
        }

        if (todo1.isDone) {
            return 1;
        }

        return -1;
    };

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
                {isSuccess && <TodoList items={todos} showErrorFn={addError} sortFn={sortByCompletionAndCreationDesc} />}

                <Footer doneItems={doneItems} todoItems={todoItems} />
            </Layout>
        </>
    );
};
