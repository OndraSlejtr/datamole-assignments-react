import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    margin-top: 15px;
    padding-top: 15px;

    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
`;

const FooterItem = styled.div``;

type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer = ({ todoItems = 0, doneItems = 0 }: FooterProps) => {
    return (
        <FooterStyled>
            <FooterItem>Todo: {todoItems}</FooterItem>
            <FooterItem>Done: {doneItems}</FooterItem>
        </FooterStyled>
    );
};
