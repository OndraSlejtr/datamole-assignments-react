import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TodoList } from "./TodoList";
import { useGetTodos } from "./hooks/useGetTodos";


export const TodoTracker = () => {
    const { data: dotos, isLoading, isFetching, isError, isSuccess, failureCount } = useGetTodos();

    return (
        <>
            <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>
            
            {isLoading && <p>Loading data...</p>}
            {isFetching && failureCount > 0 && <p>Loading new data...</p>}
            {isError && <p>Error loading data. 😔</p>}

            {isSuccess && <TodoList items={dotos} />}

            <Footer />
        </>
    );
};
