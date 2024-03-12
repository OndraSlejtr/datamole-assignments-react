import { styled } from "styled-components";

type ErrorDisplayProps = {
    error: string;
    autohideTimer?: number;
};

const ErrorDisplayItemStyled = styled.div<{ autohidetimer: number }>`
    border: 1px solid;

    background-color: ${(props) => props.theme.colors.red3};
    border-color: ${(props) => props.theme.colors.red6};
    border-radius: 5px;

    width: 100%;
    max-width: 600px;
    padding: 20px;

    -webkit-animation: cssAnimation ${(props) => props.autohidetimer}s forwards;
    animation: cssAnimation ${(props) => props.autohidetimer}s forwards;

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

export const ErrorDisplay = ({ error, autohideTimer }: ErrorDisplayProps) => {
    return (
        <ErrorDisplayStyled>
            {error && <ErrorDisplayItemStyled autohidetimer={autohideTimer || 5}>{error}</ErrorDisplayItemStyled>}
        </ErrorDisplayStyled>
    );
};
