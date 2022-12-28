import React from "react";
import styled from "styled-components";
import { SubjectSubAction } from "./SubjectSubAction";

const StyledLesson = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 200px;
	padding: 16px;
	background-color: ${(props) => props.theme.grayBg};
	color: ${(props) => props.theme.textGray};
	font-size: 16px;
	font-weight: 400;
	border-radius: 16px;
`;

const LessonHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LessonActions = styled.div`
	display: flex;
	gap: 16px;
`;

const LessonTopic = styled.span`
	font-size: 16px;
	color: ${(props) => props.theme.textPrimary};
`;

const LessonSkill = styled.span`
	border-bottom: 1px solid ${(props) => props.theme.cardPrimary[props.color]};
	width: fit-content;
`;

function SubjectLesson({
	lessonId = undefined,
	time = new Date(),
	name = "",
	skills = [],
	skillsUsed = [],
	onComplete,
	onFail,
	...props
}) {
	return (
		<StyledLesson lessonId={lessonId}>
			<LessonHeader>
				{time.toLocaleString("ru-RU", {
					month: "long",
					day: "numeric",
				})}
				<LessonActions>
					{onComplete !== undefined ? (
						<SubjectSubAction
							type="complete"
							onClick={(e) => onComplete(lessonId)}
						>
							+
						</SubjectSubAction>
					) : null}
					{onFail !== undefined ? (
						<SubjectSubAction type="fail" onClick={(e) => onFail(lessonId)}>
							-
						</SubjectSubAction>
					) : null}
				</LessonActions>
			</LessonHeader>
			<LessonTopic>{name}</LessonTopic>
			{skillsUsed.map((skillUsed) => (
				<LessonSkill key={skillUsed} color={skills[skillUsed].color}>
					{skills[skillUsed].name}
				</LessonSkill>
			))}
		</StyledLesson>
	);
}

export default SubjectLesson;
