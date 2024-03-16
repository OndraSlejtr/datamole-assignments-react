import { Container } from "./components/Container";
import { TodoTracker } from "./pages/TodoTracker";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { useErrorMessages } from "./hooks/useErrorMessages";
import { ErrorContextProvider } from "./components/providers/ErrorContext";

export const App = () => {
    const { addError, errorMessages } = useErrorMessages();

    // Use state to skipping client creation on every render
    const [queryClient] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                },
            },
            queryCache: new QueryCache({
                onError: (_error, query) => {
                    if (query.meta && query.meta.errorMessage) {
                        addError(query.meta.errorMessage as string);
                    }
                },
            }),
            mutationCache: new MutationCache({
                onError: (_error, _variables, _context, mutation) => {
                    if (mutation.meta && mutation.meta.errorMessage) {
                        addError(mutation.meta.errorMessage as string);
                    }
                },
            }),
        })
    );

    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <ErrorContextProvider addError={addError} errorMessages={errorMessages}>
                    <Container>
                        <ErrorDisplay errors={errorMessages} />
                        <TodoTracker></TodoTracker>
                    </Container>
                </ErrorContextProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};
