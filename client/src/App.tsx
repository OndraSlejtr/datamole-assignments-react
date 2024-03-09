import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { TodoTracker } from "./pages/TodoTracker";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

export const App = () => (
    <ThemeProvider>
        <QueryClientProvider client={queryClient}>
            <Container>
                <Layout>
                    <TodoTracker></TodoTracker>
                </Layout>
            </Container>
        </QueryClientProvider>
    </ThemeProvider>
);
