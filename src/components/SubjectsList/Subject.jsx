import React from "react"
import styled from "styled-components"
import ProgressBar from "../UI/ProgressBar"
import { useSelector } from "react-redux"
import { getLessonsForSubject } from "../../app/selectors/subjectsSelectors"
import { useSubject } from "../../hooks/useSubject"

const StyledSubject = styled.div`
	width: 450px;
	min-height: 150px;
	background-color: ${props => props.theme.cardBg[props.color]};
	border: 3px solid ${props => props.theme.cardPrimary[props.color]};
	border-radius: 32px;
	padding: 32px 32px;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	gap: 16px;
	cursor: pointer;
	box-shadow: ${props =>
		props.active
			? `0px 0px 40px ${props.theme.cardPrimary[props.color] + "50"}`
			: "none"};
`

const SubjectTitle = styled.span`
	font-size: 32px;
	font-weight: 500;
	word-wrap: break-word;
	max-width: 100%;
`

const SubjectProgress = styled.div`
	display: flex;
	font-size: 16px;
	font-weight: 400;
	color: ${props => props.theme.textGray};
	align-items: center;
	gap: 8px;
`

const SubjectInfo = styled.p`
	font-size: 20px;
	color: ${props => props.theme.textGray};
	display: flex;
	gap: 8px;
	align-items: flex-end;
	flex-wrap: wrap;
`

const SubjectInfoAccent = styled.span`
	font-size: 20px;
	color: ${props => props.theme.textPrimary};
`

const SubjectLabel = styled.span`
	font-size: 14px;
	color: ${props => props.theme.textPrimary};
	border-radius: 32px;
	border: 2px solid ${props => props.theme.cardPrimary[props.color]};
	background-color: ${props => props.theme.cardSecondary[props.color]};
	padding: 6px 16px;
`

function Subject({ subjectId, onClick }) {
	const subject = useSubject(subjectId)

	const subjectLessons = useSelector(state =>
		getLessonsForSubject(state, subjectId)
	)

	const nextLesson = Object.values(subjectLessons).find(
		lesson => lesson.status === "waiting"
	)

	return (
		<StyledSubject
			color={subject.color}
			onClick={onClick !== undefined ? e => onClick(e, subjectId) : null}
		>
			<SubjectTitle>{subject.name}</SubjectTitle>
			<SubjectProgress>
				Мой прогресс
				<ProgressBar
					color={subject.color}
					max={100}
					current={subject.totalSkill}
				/>
			</SubjectProgress>
			<SubjectInfo>
				{nextLesson !== undefined ? (
					<>
						следующее занятие
						<SubjectInfoAccent>
							{new Date(nextLesson.time * 1000).toLocaleString("ru-RU", {
								month: "short",
								day: "numeric",
							})}
						</SubjectInfoAccent>
					</>
				) : (
					"Занятий не найдено"
				)}
				{nextLesson !== undefined ? (
					<SubjectLabel color={subject.color}>{nextLesson.topic}</SubjectLabel>
				) : null}
			</SubjectInfo>
		</StyledSubject>
	)
}

export default Subject
