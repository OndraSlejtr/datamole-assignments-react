import { styled } from "styled-components";
import { ErrorMessage } from "../hooks/useErrorMessages";

type ErrorDisplayProps = {
    errors: ErrorMessage[];
    $autohideTimer?: number;
};

const ErrorDisplayItemStyled = styled.div<{ $autohidetimer?: number }>`
    border: 1px solid;

    background-color: ${(props) => props.theme.colors.red3};
    border-color: ${(props) => props.theme.colors.red6};
    border-radius: 5px;

    width: 100%;
    max-width: 600px;
    padding: 20px;
    margin-bottom: 10px;

    -webkit-animation: cssAnimation ${(props) => props.$autohidetimer}s forwards;
    animation: cssAnimation ${(props) => props.$autohidetimer}s forwards;

    @keyframes cssAnimation {
        0% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @-webkit-keyframes cssAnimation {
        0% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

const ErrorDisplayStyled = styled.div`
    position: absolute;
    top: 20px;
`;

export const ErrorDisplay = ({ errors, $autohideTimer }: ErrorDisplayProps) => {
    return (
        <ErrorDisplayStyled>
            {errors && errors.map(e => <ErrorDisplayItemStyled key={e.timestamp} $autohidetimer={$autohideTimer || 5}>{e.message}</ErrorDisplayItemStyled>)}
        </ErrorDisplayStyled>
    );
};
