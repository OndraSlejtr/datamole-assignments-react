import { styled } from "styled-components";

type ButtonColor = "info" | "success" | "warning";
type ButtonType = "submit" | "reset";


type ButtonProps = {
    children: React.ReactNode;
    color?: ButtonColor;
    symbolOnly?: boolean;
    onClick?: () => void;
    type?: ButtonType;
};

const StyledButton = styled.button<{ color: ButtonColor; symbolOnly: boolean }>`
    all: unset;

    background-color: ${(props) => {
        switch (props.color) {
            case "success":
                return props.theme.colors.grass9;
                break;
            case "info":
                return props.theme.colors.blue9;
                break;
            case "warning":
                return props.theme.colors.red9;
                break;
        }
    }};

    min-width: 25px;
    height: 25px;

    margin: auto 1px;
    padding: 0 ${(props) => (props.symbolOnly ? "0" : "10px")};
    font-size: ${(props) => (props.symbolOnly ? "inherit" : "80%")};

    text-align: center;
    border: 1px solid;
    border-radius: 25px;
    border-color: ${(props) => props.theme.colors.blackA7};

    color: #fff;

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
    }
`;

export const Button = ({ children, color = "info", onClick, symbolOnly = true, type }: ButtonProps) => {
    return (
        <StyledButton color={color} symbolOnly={symbolOnly} onClick={onClick} type={type}>
            {children}
        </StyledButton>
    );
};
