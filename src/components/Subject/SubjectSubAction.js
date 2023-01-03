import styled from "styled-components"

export const SubjectSubAction = styled.button`
	font-size: 16px;
	font-weight: 400;
	background-color: #cff8ec;
	line-height: 10px;
	width: 20px;
	height: 20px;
	padding: 4px;
	border-radius: 50px;
	border: none;
	cursor: pointer;
	color: ${props =>
		props.type === "complete"
			? props.theme.cardPrimary.green
			: props.theme.cardPrimary.red};
`
