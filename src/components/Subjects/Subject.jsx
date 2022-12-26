import React from "react";
import styled from "styled-components";

const StyledSubject = styled.div`
	width: 300px;
	min-height: 150px;
	background-color: ${(props) => props.theme.cardBg[props.color]};
`;

function Subject({ color = "orange", ...props }) {
	return <StyledSubject color={color}></StyledSubject>;
}

export default Subject;
