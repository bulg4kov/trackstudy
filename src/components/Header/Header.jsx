import React from "react";
import Logo from "../UI/Logo/Logo";
import styled from "styled-components";

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	width: 100%;
	gap: 32px;
`;

const StyledSubtitle = styled.span`
	font-size: 16px;
	font-weight: 500;
	color: ${(props) => props.theme.textGray};
`;

function Header(props) {
	return (
		<StyledHeader>
			<Logo />
			<StyledSubtitle>Удобный трекинг учёбы</StyledSubtitle>
		</StyledHeader>
	);
}

export default Header;
