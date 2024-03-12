import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";
import { Form } from "./form";
import { useToggle } from "../hooks/useToggle";
import { Button } from "./Button";

const StyledDiv = styled.header`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    margin-bottom: 20px;

    h1 {
        font-size: 24px;
        font-weight: 900;
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = (props: HeaderProps) => {
    const { children, onItemAdd } = props;
    const { isToggledOn: isAddFormShown, toggle: toggleAddFormShown } = useToggle(false);

    return (
        <StyledDiv>
            <h1>{children}</h1>

            {isAddFormShown ? (
                <Form
                    initialValue={""}
                    onSubmit={(value) => {
                        onItemAdd(value);
                        toggleAddFormShown();
                    }}
                    onCancel={toggleAddFormShown}
                />
            ) : (
                <Button onClick={toggleAddFormShown} color="success">
                    <PlusIcon />
                </Button>
            )}
        </StyledDiv>
    );
};
