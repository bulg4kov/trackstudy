import styled from "styled-components";

export const SubjectSubAction = styled.button`
	font-size: 16px;
	font-weight: 400;
	background-color: unset;
	border: none;
	cursor: pointer;
	color: ${(props) =>
		props.type === "complete"
			? props.theme.cardPrimary.green
			: props.theme.cardPrimary.red};
`;
