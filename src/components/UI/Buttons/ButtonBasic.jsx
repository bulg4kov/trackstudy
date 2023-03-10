import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
	color: ${props => props.theme.buttonText};
	background-color: ${props => props.theme.buttonBg};
	font-weight: 500;
	font-size: 16px;
	padding: 10px;
	border: 0;
	max-width: 150px;
	border-radius: 16px;
	cursor: pointer;
	box-sizing: border-box;
	border: 2px solid ${props => props.theme.buttonBg};
	transition: all 100ms;
	&:hover {
		border-color: ${props => props.theme.buttonText};
	}
`

function ButtonBasic({
	callback,
	title = "Добавьте название кнопки",
	...props
}) {
	return <StyledButton onClick={callback}>{title}</StyledButton>
}

export default ButtonBasic
