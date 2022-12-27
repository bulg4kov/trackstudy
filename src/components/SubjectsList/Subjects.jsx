import React from "react";
import styled from "styled-components";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import Subject from "./Subject";
import { changeCurrentSubject } from "../../app/slices/appSlice";

const SubjectsSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 32px;
	max-width: 450px;
`;

const SubjectsAction = styled.div`
	display: flex;
	gap: 24px;
`;

const SubjectsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const getSubjects = createSelector(
	(state) => state.subjects,
	(subjects) =>
		subjects.map((subject) => ({
			id: subject.id,
			name: subject.name,
			skill: subject.totalSkill,
			color: subject.color,
			lesson:
				subject.lessons.length > 0
					? subject.lessons[subject.lessons.length - 1]
					: undefined,
		}))
);

function Subjects() {
	const subjects = useSelector((state) => getSubjects(state));
	const dispatch = useDispatch();

	const onSubjectClick = (e, subjectId) => {
		dispatch(changeCurrentSubject({ newId: subjectId }));
	};

	return (
		<SubjectsSection>
			<SubjectsAction>
				<h2 className={"TabTitle"}>Мои предметы</h2>
				<ButtonBasic title={"Добавить"} />
			</SubjectsAction>
			<SubjectsList>
				{subjects.map((subject) => (
					<Subject
						subjectId={subject.id}
						color={subject.color}
						name={subject.name}
						progress={subject.skill}
						nextLesson={new Date(subject.lesson.time * 1000)}
						topic={subject.lesson.topic}
						onClick={onSubjectClick}
						key={subject.id}
					/>
				))}
				{/*<Subject*/}
				{/*	color="orange"*/}
				{/*	name="ReactJS"*/}
				{/*	progress={67}*/}
				{/*	nextLesson={new Date("2022-12-31")}*/}
				{/*	topic="useContext"*/}
				{/*/>*/}
				{/*<Subject*/}
				{/*	color="green"*/}
				{/*	name="VueJS"*/}
				{/*	progress={5}*/}
				{/*	nextLesson={new Date("2023-1-3")}*/}
				{/*	topic="Основы vue.js и как его применять на практике, документация vue.js"*/}
				{/*/>*/}
			</SubjectsList>
		</SubjectsSection>
	);
}

export default Subjects;
