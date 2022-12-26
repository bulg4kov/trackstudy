import React from "react";
import styled from "styled-components";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import Subject from "./Subject";

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

function Subjects(props) {
	return (
		<SubjectsSection>
			<SubjectsAction>
				<h2 className={"TabTitle"}>Мои предметы</h2>
				<ButtonBasic title={"Добавить"} />
			</SubjectsAction>
			<SubjectsList>
				<Subject
					color="orange"
					name="ReactJS"
					progress={67}
					nextLesson={new Date("2022-12-31")}
					topic="useContext"
				/>
				<Subject
					color="green"
					name="VueJS"
					progress={5}
					nextLesson={new Date("2023-1-3")}
					topic="Основы vue.js и как его применять на практике, документация vue.js"
				/>
			</SubjectsList>
		</SubjectsSection>
	);
}

export default Subjects;
