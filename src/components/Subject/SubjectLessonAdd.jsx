import React, { useState } from "react";
import styled from "styled-components";
import SelectBasic from "../UI/Selects/SelectBasic";
import InputBasic from "../UI/Inputs/InputBasic";
import { SubjectSubAction } from "./SubjectSubAction";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import { useSelector } from "react-redux";
import { getLessonById } from "../../app/selectors/subjectsSelectors";

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

function SubjectLessonAdd({
	subjectId,
	lessonId,
	onSave,
	availableSkills,
	...props
}) {
	const currentLesson = useSelector((state) =>
		getLessonById(state, subjectId, lessonId)
	);

	// Установка состояния начальной даты
	const [date, setDate] = useState(() => {
		const date = new Date(currentLesson.time * 1000);
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	});

	// Установка состояния навыков для занятия
	const [selectedSkill, setSelectedSkill] = useState(
		availableSkills !== undefined && Object.keys(availableSkills).length > 0
			? Object.keys(availableSkills)[0]
			: undefined
	);
	const [addedSkills, setAddedSkills] = useState([]);
	const [topic, setTopic] = useState("");

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
			...currentLesson,
			skills: addedSkills,
			topic: topic,
			time: parseInt(new Date(date).getTime()) / 1000,
		};
		onSave(newLesson, lessonId);
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
				placeholder={"Моё новое занятие"}
				onChange={(e) => setTopic(e.target.value)}
				small
			/>
			{availableSkills !== undefined &&
			Object.keys(availableSkills).length > 0 ? (
				<StyledDivFlex>
					<SelectBasic
						options={Object.entries(availableSkills).map((skill) => {
							return { name: skill[1].name, value: skill[0] };
						})}
						onChange={(e) => setSelectedSkill(e.target.value)}
					/>
					<SubjectSubAction type={"complete"} onClick={handleAddSkill}>
						+
					</SubjectSubAction>
				</StyledDivFlex>
			) : null}
			{addedSkills.length > 0
				? addedSkills.map((skill) => (
						<StyledDivFlex key={skill}>
							{
								Object.entries(availableSkills).find((avSkill) => {
									return avSkill[0] == skill;
								})[1].name
							}
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
