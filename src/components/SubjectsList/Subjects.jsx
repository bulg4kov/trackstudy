import React from "react";
import styled from "styled-components";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import Subject from "./Subject";
import {
	changeCurrentStatus,
	changeCurrentSubject,
} from "../../app/slices/appSlice";

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
			lessons: subject.lessons.length > 0 ? subject.lessons : undefined,
		}))
);

function Subjects() {
	const subjects = useSelector((state) => getSubjects(state));

	const dispatch = useDispatch();

	const onSubjectClick = (e, subjectId) => {
		dispatch(changeCurrentSubject({ newId: subjectId }));
		dispatch(changeCurrentStatus("view"));
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
						subject={subject}
						onClick={onSubjectClick}
						key={subject.id}
					/>
				))}
			</SubjectsList>
		</SubjectsSection>
	);
}

export default Subjects;
