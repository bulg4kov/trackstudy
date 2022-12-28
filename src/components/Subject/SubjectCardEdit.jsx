import React, { useEffect, useState } from "react";
import {
	Subject,
	SubjectContainer,
	SubjectHeader,
	SubjectTitle,
} from "./SubjectStyled";
import InputBasic from "../UI/Inputs/InputBasic";
import ButtonBasic from "../UI/Buttons/ButtonBasic";
import SubjectData from "./SubjectData";
import SelectBasic from "../UI/Selects/SelectBasic";
import { colorsList } from "../../utils/colorsList";
import SubjectSkillEdit from "./SubjectSkillEdit";
import { editSubject } from "../../app/slices/subjectsSlice";
import { useDispatch } from "react-redux";
import { changeCurrentStatus } from "../../app/slices/appSlice";
import { useSubject } from "../../hooks/useSubject";

function SubjectCardEdit({ currentSubjectId }) {
	const subject = useSubject(currentSubjectId);

	const [nameValue, setNameValue] = useState(subject.name);
	const [colorValue, setColorValue] = useState(subject.color);
	const [descValue, setDescValue] = useState(subject.description);
	const [skills, setSkills] = useState(subject.skills);

	const dispatch = useDispatch();

	const onSave = (e) => {
		dispatch(
			editSubject({
				...subject,
				id: subject.id,
				name: nameValue,
				color: colorValue,
				description: descValue,
				skills: skills,
			})
		);
		dispatch(changeCurrentStatus("view"));
	};

	const onNameChange = (e) => {
		setNameValue(e.target.value);
	};

	const onColorChange = (e) => {
		setColorValue(e.target.value);
	};

	const onDescChange = (e) => {
		setDescValue(e.target.value);
	};

	const onSkillAdd = (e) => {
		const newSkill = {
			color: "orange",
			id: skills.length + 1,
			name: "Название навыка",
			progress: 0,
		};
		setSkills((skills) => [...skills, newSkill]);
	};

	const onSkillEditName = (name, id) => {
		const editedSkill = skills.findIndex((skill) => skill.id === id);
		const newSkills = JSON.parse(JSON.stringify([...skills]));
		newSkills[editedSkill].name = name;
		setSkills(newSkills);
	};

	const onSkillEditColor = (color, id) => {
		const editedSkill = skills.findIndex((skill) => skill.id === id);
		const newSkills = JSON.parse(JSON.stringify([...skills]));
		newSkills[editedSkill].color = color;
		setSkills(newSkills);
	};

	const onSkillRemove = (id) => {
		setSkills(skills.filter((skill) => skill.id !== id));
	};

	useEffect(() => {
		setNameValue(subject.name);
		setColorValue(subject.color);
		setDescValue(subject.description);
		setSkills(subject.skills);
	}, [subject]);

	return (
		<section>
			<Subject>
				<SubjectHeader>
					<SubjectTitle cardEdit>
						<InputBasic
							type={"text"}
							value={nameValue}
							name={"Название предмета"}
							onChange={onNameChange}
						/>
						<SelectBasic
							options={colorsList}
							onChange={onColorChange}
							value={colorValue}
						/>
					</SubjectTitle>
					<ButtonBasic title="Сохранить" callback={onSave} />
				</SubjectHeader>
				<InputBasic
					type={"text"}
					value={descValue}
					name={"Описание"}
					onChange={onDescChange}
					small
				/>
				<SubjectContainer>
					<SubjectData title={"Мои навыки"} addAction={onSkillAdd}>
						{skills.map((skill) => (
							<SubjectSkillEdit
								key={skill.id}
								id={skill.id}
								skill={skill}
								onChangeName={onSkillEditName}
								onChangeColor={onSkillEditColor}
								onRemove={onSkillRemove}
							/>
						))}
					</SubjectData>
				</SubjectContainer>
			</Subject>
		</section>
	);
}

export default SubjectCardEdit;
