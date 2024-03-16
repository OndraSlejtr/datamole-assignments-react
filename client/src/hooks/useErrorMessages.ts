import { useState } from "react";

export type ErrorMessage = { message: string; timestamp: number };

export const useErrorMessages = () => {
    const [errorMessages, setErrorMessage] = useState<ErrorMessage[]>([]);
    const addError = (message: string) => setErrorMessage((old) => [{ message, timestamp: Date.now() }, ...old]);

    return { errorMessages, addError };
};
