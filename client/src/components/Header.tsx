import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Form } from "./form";
import { useToggle } from "../hooks/useToggle";

const StyledDiv = styled.header`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    margin-bottom: 20px;

    button {
        all: unset;

        width: 25px;
        height: 25px;

        text-align: center;

        background-color: ${(props) => props.theme.colors.grass9};
        border: 1px solid;
        border-color: ${(props) => props.theme.colors.blackA7};
        border-radius: 50%;

        color: #fff;

        margin: auto 3px;
    }

    
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
                <button onClick={toggleAddFormShown}>
                    <PlusIcon />
                </button>
            )}
        </StyledDiv>
    );
};
