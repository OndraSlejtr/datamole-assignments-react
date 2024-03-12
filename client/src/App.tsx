import { Container } from "./components/Container";
import { TodoTracker } from "./pages/TodoTracker";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query.client";

export const App = () => (
    <ThemeProvider>
        <QueryClientProvider client={queryClient}>
            <Container>
                <TodoTracker></TodoTracker>
            </Container>
        </QueryClientProvider>
    </ThemeProvider>
);
