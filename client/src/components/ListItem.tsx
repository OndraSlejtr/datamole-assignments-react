import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { useToggle } from "../hooks/useToggle";
import { Form } from "./form";
import { Button } from "./Button";


const ActionItems = styled.div`
    margin-left: auto;
    display: none;
`;

const ListItemContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 30px;

    
    &:hover ${ActionItems} {
        display: block;
    }
`;

const StyledListItem = styled.li`
    padding-bottom: 5px;
    height: 30px;
    list-style-type: none;

    form {
        height: 30px;
    }
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
        <StyledListItem>
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
                <ListItemContent>
                    <>
                        <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
                        <Label>{label}</Label>
                    </>
                    <ActionItems>
                        <Button onClick={onItemDelete} color="warning">
                            <TrashIcon />
                        </Button>

                        <Button onClick={toggleEditForm} color="info">
                            <Pencil1Icon />
                        </Button>
                    </ActionItems>
                </ListItemContent>
            )}
        </StyledListItem>
    );
};
