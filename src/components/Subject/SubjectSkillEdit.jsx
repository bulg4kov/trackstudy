import React from "react";
import styled from "styled-components";
import { colorsList } from "../../utils/colorsList";
import SelectBasic from "../UI/Selects/SelectBasic";
import InputBasic from "../UI/Inputs/InputBasic";
import { SubjectSubAction } from "./SubjectSubAction";

export const SkillEditable = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	border-radius: 16px;
	padding: 16px;
	align-items: flex-start;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
function SubjectSkillEdit({
	id,
	skill,
	onChangeName,
	onChangeColor,
	onRemove,
	...props
}) {
	const handleSkillNameChange = (e) => {
		onChangeName(e.target.value, id);
	};

	const handleSkillColorChange = (e) => {
		onChangeColor(e.target.value, id);
	};

	return (
		<SkillEditable>
			<InputBasic
				name={"Название навыка"}
				value={skill.name}
				onChange={handleSkillNameChange}
				type={"text"}
				small
			/>
			<SelectBasic
				options={colorsList}
				onChange={handleSkillColorChange}
				value={skill.name}
			/>
			<SubjectSubAction type="fail" onClick={(e) => onRemove(id)}>
				Удалить
			</SubjectSubAction>
		</SkillEditable>
	);
}

export default SubjectSkillEdit;
