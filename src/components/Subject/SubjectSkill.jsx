import React from "react"
import ProgressBar from "../UI/ProgressBar"
import styled from "styled-components"

const StyledSkill = styled.div`
	font-size: 16px;
	font-weight: 400;
	color: ${props => props.theme.textGray};
	display: flex;
	flex-direction: column;
	gap: 4px;
`

const StyledSkillProgress = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	span {
		color: ${props => props.theme.cardPrimary[props.color]};
	}
	span:nth-last-child(1) {
		color: ${props => props.theme.textGray};
	}
`

function SubjectSkill({
	name = "Мой навык",
	color = "orange",
	progress = 0,
	...props
}) {
	return (
		<StyledSkill>
			{name}
			<StyledSkillProgress color={color}>
				<span>{progress}</span>
				<ProgressBar color={color} max={100} current={progress} />
				<span>100</span>
			</StyledSkillProgress>
		</StyledSkill>
	)
}

export default SubjectSkill
