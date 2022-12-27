import React from "react";
import styled from "styled-components";

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

const LessonAction = styled.button`
	font-size: 16px;
	font-weight: 400;
	background-color: unset;
	border: none;
	color: ${(props) =>
		props.type === "complete"
			? props.theme.cardPrimary.green
			: props.theme.cardPrimary.red};
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
					<LessonAction type="complete" onClick={onComplete}>
						+
					</LessonAction>
					<LessonAction type="fail" onClick={onFail}>
						-
					</LessonAction>
				</LessonActions>
			</LessonHeader>
			<LessonTopic>{name}</LessonTopic>
			{skills.map((skill) => (
				<LessonSkill key={skill.id} color={skill.color}>
					{skill.name}
				</LessonSkill>
			))}
		</StyledLesson>
	);
}

export default SubjectLesson;
