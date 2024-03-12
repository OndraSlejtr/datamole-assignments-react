import { useState } from "react";

export const useErrorMessage = () => {
    const [errorMessage, setErrorMessage] = useState({ message: "", timestamp: 0 });
    const addError = (message: string) => setErrorMessage({ message, timestamp: Date.now() });

    return { errorMessage, addError };
};
