import React, { useState } from "react";
import styled from "styled-components";
import SelectBasic from "../UI/Selects/SelectBasic";
import InputBasic from "../UI/Inputs/InputBasic";
import { SubjectSubAction } from "./SubjectSubAction";
import ButtonBasic from "../UI/Buttons/ButtonBasic";

const StylesLessonEditabel = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	border-radius: 16px;
	padding: 16px;
	align-items: flex-start;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const StyledDivFlex = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

function SubjectLessonAdd({ initData, onSave, availableSkills, ...props }) {
	const [date, setDate] = useState(() => {
		const date = new Date(initData.time * 1000);
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	});
	const [selectedSkill, setSelectedSkill] = useState(
		availableSkills !== undefined && availableSkills.length > 0
			? availableSkills[0].id
			: undefined
	);
	const [addedSkills, setAddedSkills] = useState([]);
	const [topic, setTopic] = useState(initData.topic);

	const handleSetDate = (e) => {
		const newDate = e.target.value;
		const newDateObject = new Date(newDate);
		const currDate = new Date();
		const newDateSplited = newDate.split("-");
		if (newDateObject < currDate) {
			return;
		}
		setDate(newDate);
	};

	const handleAddSkill = (e) => {
		const newSkills =
			addedSkills.length > 0
				? addedSkills.includes(selectedSkill)
					? [...addedSkills]
					: [...addedSkills, selectedSkill]
				: [selectedSkill];
		setAddedSkills(newSkills);
	};

	const handleRemoveSkill = (targetId) => {
		setAddedSkills(addedSkills.filter((id) => id !== targetId));
	};

	const handleSave = (e) => {
		const newLesson = {
			...initData,
			skills: addedSkills,
			topic: topic,
			time: parseInt(new Date(date).getTime()) / 1000,
		};
		onSave(newLesson);
	};

	return (
		<StylesLessonEditabel>
			<InputBasic
				name={"Дата занятия"}
				type={"date"}
				value={date}
				onChange={handleSetDate}
				small
			/>
			<InputBasic
				name={"Тема занятия"}
				type={"text"}
				value={topic}
				onChange={(e) => setTopic(e.target.value)}
				small
			/>
			{availableSkills !== undefined && availableSkills.length > 0 ? (
				<StyledDivFlex>
					<SelectBasic
						options={availableSkills.map((skill) => {
							return { name: skill.name, value: skill.id };
						})}
						onChange={(e) => setSelectedSkill(parseInt(e.target.value))}
					/>
					<SubjectSubAction type={"complete"} onClick={handleAddSkill}>
						+
					</SubjectSubAction>
				</StyledDivFlex>
			) : null}
			{addedSkills.length > 0
				? addedSkills.map((skill, index) => (
						<StyledDivFlex key={skill}>
							{availableSkills.find((avSkill) => avSkill.id == skill).name}
							<SubjectSubAction
								type={"fail"}
								onClick={(e) => handleRemoveSkill(skill)}
							>
								-
							</SubjectSubAction>
						</StyledDivFlex>
				  ))
				: null}
			<ButtonBasic small title={"Сохранить"} callback={handleSave} />
		</StylesLessonEditabel>
	);
}

export default SubjectLessonAdd;
