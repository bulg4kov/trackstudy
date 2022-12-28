import React, { useMemo } from "react";
import styled from "styled-components";
import ProgressBar from "../UI/ProgressBar";

const StyledSubject = styled.div`
	width: 450px;
	min-height: 150px;
	background-color: ${(props) => props.theme.cardBg[props.color]};
	border: 3px solid ${(props) => props.theme.cardPrimary[props.color]};
	border-radius: 32px;
	padding: 32px 32px;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	gap: 16px;
	cursor: pointer;
	box-shadow: ${(props) =>
		props.active
			? `0px 0px 40px ${props.theme.cardPrimary[props.color] + "50"}`
			: "none"};
`;

const SubjectTitle = styled.span`
	font-size: 32px;
	font-weight: 500;
`;

const SubjectProgress = styled.div`
	display: flex;
	font-size: 16px;
	font-weight: 400;
	color: ${(props) => props.theme.textGray};
	align-items: center;
	gap: 8px;
`;

const SubjectInfo = styled.p`
	font-size: 20px;
	color: ${(props) => props.theme.textGray};
	display: flex;
	gap: 8px;
	align-items: flex-end;
	flex-wrap: wrap;
`;

const SubjectInfoAccent = styled.span`
	font-size: 20px;
	color: ${(props) => props.theme.textPrimary};
`;

const SubjectLabel = styled.span`
	font-size: 14px;
	color: ${(props) => props.theme.textPrimary};
	border-radius: 32px;
	border: 2px solid ${(props) => props.theme.cardPrimary[props.color]};
	background-color: ${(props) => props.theme.cardSecondary[props.color]};
	padding: 6px 16px;
`;

function Subject({
	subjectId = undefined,
	color = "orange",
	name = "Предмет",
	progress = 0,
	topic = undefined,
	nextLesson = undefined,
	active = false,
	onClick = undefined,
}) {
	nextLesson = useMemo(() => {
		return nextLesson !== [] ? nextLesson[0] : undefined;
	}, [nextLesson]);

	return (
		<StyledSubject
			color={color}
			active={active}
			onClick={onClick !== undefined ? (e) => onClick(e, subjectId) : null}
		>
			<SubjectTitle>{name}</SubjectTitle>
			<SubjectProgress>
				Мой прогресс
				<ProgressBar color={color} max={100} current={progress} />
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
				) : null}
				{nextLesson !== undefined ? (
					<SubjectLabel color={color}>{nextLesson.topic}</SubjectLabel>
				) : null}
			</SubjectInfo>
		</StyledSubject>
	);
}

export default Subject;
