import React, { useState } from "react";
import styled from "styled-components";
import InputBasic from "../UI/Inputs/InputBasic";
import ButtonBasic from "../UI/Buttons/ButtonBasic";

const StyledMaterialEditable = styled.div`
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

function SubjectMaterialAdd({ onSave }) {
	const [name, setName] = useState();

	return (
		<StyledMaterialEditable>
			<InputBasic
				name={"Материал"}
				type={"text"}
				value={name}
				placeholder={"Учебник C# 9, издание 2021 года"}
				onChange={(e) => setName(e.target.value)}
				small
			/>

			<ButtonBasic small title={"Добавить"} callback={(e) => onSave(name)} />
		</StyledMaterialEditable>
	);
}

export default SubjectMaterialAdd;
