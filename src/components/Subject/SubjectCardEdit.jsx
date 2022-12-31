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
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStatus } from "../../app/slices/appSlice";
import { useSubject } from "../../hooks/useSubject";
import { getSkillsForSubject } from "../../app/selectors/subjectsSelectors";
import {
	addSubjectSkillThunk,
	editSubjectSkillThunk,
	editSubjectThunk,
	removeSubjectSkillThunk,
	removeSubjectThunk,
} from "../../app/slices/subjectsThunks";

function SubjectCardEdit({ currentSubjectId }) {
	const subject = useSubject(currentSubjectId);
	const subjectSkills = useSelector((state) =>
		getSkillsForSubject(state, currentSubjectId)
	);

	const [nameValue, setNameValue] = useState(subject.name);
	const [colorValue, setColorValue] = useState(subject.color);
	const [descValue, setDescValue] = useState(subject.description);
	const [skills, setSkills] = useState(subjectSkills);

	const dispatch = useDispatch();

	const onSave = (e) => {
		dispatch(
			editSubjectThunk(currentSubjectId, {
				...subject,
				name: nameValue,
				color: colorValue,
				description: descValue,
				skills: skills,
			})
		);
		dispatch(setCurrentStatus("view"));
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
		dispatch(addSubjectSkillThunk(currentSubjectId));
	};

	const onSkillEditName = (name, id) => {
		dispatch(editSubjectSkillThunk(currentSubjectId, id, "name", name));
	};

	const onSkillEditColor = (color, id) => {
		dispatch(editSubjectSkillThunk(currentSubjectId, id, "color", color));
	};

	const onSkillRemove = (id) => {
		dispatch(removeSubjectSkillThunk(currentSubjectId, id));
	};

	const onRemoveSubject = () => {
		dispatch(removeSubjectThunk(currentSubjectId));
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
					<ButtonBasic title="Удалить" callback={onRemoveSubject} />
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
						{Object.entries(subjectSkills).map((skill) => (
							<SubjectSkillEdit
								key={skill[0]}
								id={skill[0]}
								skill={skill[1]}
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
