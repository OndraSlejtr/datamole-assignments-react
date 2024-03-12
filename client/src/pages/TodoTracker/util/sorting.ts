import { TodoItem } from "../../../types/todo";

export const sortTodosByCompletionAndCreationDesc = (todo1: TodoItem, todo2: TodoItem) => {
    if (todo1.isDone === todo2.isDone) {
        return todo2.createdAt - todo1.createdAt;
    }

    if (todo1.isDone) {
        return 1;
    }

    return -1;
};
