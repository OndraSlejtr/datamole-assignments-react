import { styled } from "styled-components";

type ButtonColor = "info" | "success" | "warning";
type ButtonType = "submit" | "reset";

type ButtonProps = {
    children: React.ReactNode;
    color?: ButtonColor;
    $symbolonly?: boolean;
    onClick?: () => void;
    type?: ButtonType;
};

const StyledButton = styled.button<{ color: ButtonColor; $symbolonly: boolean }>`
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
    padding: 0 ${(props) => (props.$symbolonly ? "0" : "10px")};
    font-size: ${(props) => (props.$symbolonly ? "inherit" : "80%")};

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

export const Button = ({ children, color = "info", onClick, $symbolonly = true, type }: ButtonProps) => {
    return (
        <StyledButton color={color} $symbolonly={$symbolonly} onClick={onClick} type={type}>
            {children}
        </StyledButton>
    );
};
