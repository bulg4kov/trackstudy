import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
	color: ${(props) => props.theme.buttonText};
	background-color: ${(props) => props.theme.buttonBg};
	font-weight: 500;
	font-size: 16px;
	padding: 4px 8px;
	border: 0;
	width: fit-content;
	border-radius: 999px;
	cursor: pointer;
	box-sizing: border-box;
	border: 2px solid ${(props) => props.theme.buttonBg};
	transition: all 100ms;
	&:hover {
		border-color: ${(props) => props.theme.buttonText};
	}
`;

function ButtonAddBig({ callback, ...props }) {
	return <StyledButton onClick={callback}>+</StyledButton>;
}

export default ButtonAddBig;
