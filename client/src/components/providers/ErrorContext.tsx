import { PropsWithChildren, createContext } from "react";
import { useErrorMessages } from "../../hooks/useErrorMessages";

export const ErrorContext = createContext<ReturnType<typeof useErrorMessages>>({
    addError: () => {},
    errorMessages: [],
});

type ErrorContextProviderProps = PropsWithChildren & ReturnType<typeof useErrorMessages>;

export const ErrorContextProvider = ({ children, ...rest }: ErrorContextProviderProps) => {
    return <ErrorContext.Provider value={rest}>{children}</ErrorContext.Provider>;
};
