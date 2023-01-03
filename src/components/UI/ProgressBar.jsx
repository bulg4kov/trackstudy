import React from "react"
import styled from "styled-components"

const StyledProgressBar = styled.div`
  width: ${props => props.max + "px"};
  height: 7px;
	overflow: hidden;
	border-radius: 8px;
  background-color: ${props => props.theme.cardSecondary[props.color]}};
`

const StyledProgressComplete = styled.div`
	width: ${props => props.current + "%"};
	height: 7px;
	background-color: ${props => props.theme.cardPrimary[props.color]};
`

function ProgressBar({ color, max, current, ...props }) {
	return (
		<StyledProgressBar color={color} max={max}>
			<StyledProgressComplete color={color} current={current} />
		</StyledProgressBar>
	)
}

export default ProgressBar
