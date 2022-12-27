import React from "react";
import styled from "styled-components";
import ButtonAddBig from "../UI/Buttons/ButtonAddBig";

const StyledSubjectData = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	grid-row-start: ${(props) => (props.alignRight ? "1" : "auto")};
	grid-row-end: ${(props) => (props.alignRight ? "3" : "auto")};
`;

const StyledColumnHeader = styled.div`
	display: flex;
	gap: 12px;
	font-size: 20px;
	font-weight: 500;
	align-items: baseline;
`;

function SubjectData({
	title,
	addAction = undefined,
	alignRight,
	children,
	props,
}) {
	return (
		<StyledSubjectData alignRight={alignRight}>
			<StyledColumnHeader>
				{title}
				{addAction !== undefined ? <ButtonAddBig callback={addAction} /> : null}
			</StyledColumnHeader>
			{children}
		</StyledSubjectData>
	);
}

export default SubjectData;
