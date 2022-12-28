import React, { useState } from "react";
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
	align-items: center;
`;

const ExpandArrow = styled.button`
	font-size: 12px;
	font-weight: 400;
	cursor: pointer;
	border: none;
	background-color: unset;
	transition: transform 0.2s;
	transform: ${(props) => (props.expanded ? "scaleY(-1)" : "none")};
`;

function SubjectData({
	title,
	addAction = undefined,
	alignRight,
	children,
	expand,
	props,
}) {
	const [expanded, setExpanded] = useState(
		expand !== undefined ? expand : true
	);

	return (
		<StyledSubjectData>
			<StyledColumnHeader>
				{title}
				{addAction !== undefined ? <ButtonAddBig callback={addAction} /> : null}
				{expand !== undefined ? (
					<ExpandArrow
						onClick={() => setExpanded(!expanded)}
						expanded={expanded}
					>
						▼
					</ExpandArrow>
				) : null}
			</StyledColumnHeader>

			{expanded ? children : null}
		</StyledSubjectData>
	);
}

export default SubjectData;
