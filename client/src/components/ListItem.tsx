import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { useToggle } from "../hooks/useToggle";
import { Form } from "./form";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    margin-left: 15px;
`;

export type ListItemProp = {
    label: string;
    isDone: boolean;
    onItemLabelEdit: (label: string) => void;
    onItemDoneToggle: (isDone: boolean) => void;
    onItemDelete: () => void;
};

export const ListItem = (props: ListItemProp) => {
    const { label, isDone, onItemLabelEdit, onItemDoneToggle, onItemDelete } = props;
    const { isToggledOn: isEditFormShown, toggle: toggleEditForm } = useToggle();

    return (
        <StyledDiv>
            {isEditFormShown ? (
                <Form
                    initialValue={label}
                    onSubmit={(input) => {
                        onItemLabelEdit(input);
                        toggleEditForm();
                    }}
                    onCancel={toggleEditForm}
                ></Form>
            ) : (
                <>
                    <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
                    <Label>{label}</Label>
                    <button onClick={onItemDelete}>
                        <TrashIcon />
                    </button>

                    <button onClick={toggleEditForm}>
                        <Pencil1Icon />
                    </button>
                </>
            )}
        </StyledDiv>
    );
};
