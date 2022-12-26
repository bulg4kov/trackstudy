import React from "react";
import styled from "styled-components";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import SubjectSkill from "./SubjectSkill";

const Subject = styled.article`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 550px;
`;

const SubjectContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const SubjectHeader = styled.div`
	display: flex;
	gap: 32px;
	align-items: flex-start;
	flex-wrap: wrap;
`;

const SubjectTitle = styled.div`
	display: flex;
	flex-direction: column;
`;

const SubjectColor = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	div {
		width: 9px;
		height: 9px;
		background-color: ${(props) => props.theme.cardPrimary[props.color]};
	}
`;

const SubjectDescription = styled.p`
	font-size: 16px;
	width: 450px;
`;

const SubjectSkills = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

function SubjectCard(props) {
	return (
		<section>
			<Subject>
				<SubjectHeader>
					<SubjectTitle>
						<h3 className="TabTitle">ReactJS</h3>
						<SubjectColor color={"orange"}>
							цвет: <div></div>
						</SubjectColor>
					</SubjectTitle>
					<ButtonBasic title="Редактировать" />
				</SubjectHeader>
				<SubjectDescription>
					Изучение фреймворка для JavaScript - ReactJS 16+ версии с хуками,
					функциональные компоненты
				</SubjectDescription>
				<SubjectContainer>
					<SubjectSkills>
						<span className="ColumnTitle">Мои навыки</span>
						<SubjectSkill name="Общий прогресс" color="orange" progress={67} />
						<SubjectSkill
							name="Теоретичская база"
							color="green"
							progress={90}
						/>
						<SubjectSkill name="Практика" color="blue" progress={50} />
						<SubjectSkill name="Библиотеки" color="red" progress={22} />
					</SubjectSkills>
				</SubjectContainer>
			</Subject>
		</section>
	);
}

export default SubjectCard;
