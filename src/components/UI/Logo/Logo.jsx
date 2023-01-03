import React from "react"
import styled from "styled-components"

const StyledLogo = styled.h3`
	font-family: "Roboto Condensed", sans-serif;
	font-style: italic;
	font-weight: 700;
	font-size: 32px;
	padding: 10px;
	background-color: ${props => props.theme.bgPrimary};
	border-radius: 8px;
	width: fit-content;
`
function Logo(props) {
	return <StyledLogo>track.study</StyledLogo>
}

export default Logo
