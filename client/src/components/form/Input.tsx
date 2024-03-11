import styled from "styled-components";

const InputStyled = styled.input`
    width: 100%;
`;

type InputProps = {
    value: string;
    onValueChange: (value: string) => void;
};

export const Input = (props: InputProps) => {
    const { value, onValueChange } = props;

    return (
        <InputStyled
            value={value}
            onChange={(e) => {
                const value = e.currentTarget.value;
                onValueChange(value);
            }}
        />
    );
};
