import React from "react";
import styled from "styled-components";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import Subject from "./Subject";

const SubjectsSection = styled.section`
	display: flex;
	flex-direction: column;
	max-width: 450px;
`;

const SubjectsAction = styled.div`
	display: flex;
	gap: 24px;
`;

function Subjects(props) {
	return (
		<SubjectsSection>
			<SubjectsAction>
				<h2 className={"TabTitle"}>Мои предметы</h2>
				<ButtonBasic title={"Добавить"} />
			</SubjectsAction>
			<Subject />
		</SubjectsSection>
	);
}

export default Subjects;
