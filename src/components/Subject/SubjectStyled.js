import styled from "styled-components";

export const Subject = styled.article`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 550px;
`;

export const SubjectContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr max-content;
	grid-auto-flow: column;
	gap: 24px;
	justify-content: space-between;
`;

export const SubjectHeader = styled.div`
	display: grid;
	gap: 32px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 1fr;
`;

export const SubjectTitle = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${(props) => (props.cardEdit ? "12px" : "0px")};
`;

export const SubjectColor = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	div {
		width: 9px;
		height: 9px;
		background-color: ${(props) => props.theme.cardPrimary[props.color]};
	}
`;

export const SubjectDescription = styled.p`
	font-size: 16px;
	width: 450px;
`;

export const SubjectMaterial = styled.span`
	font-size: 16px;
	font-weight: 400;
	color: ${(props) =>
		props.as === "a" ? props.theme.link : props.theme.textPrimary};
`;
