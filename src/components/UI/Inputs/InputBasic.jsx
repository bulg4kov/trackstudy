import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
	padding: 8px 16px;
	font-size: ${(props) => (props.small ? "14px" : "20px")};
	border-radius: 16px;
	border: none;
	background-color: ${(props) => props.theme.grayBg};
	text-overflow: ellipsis;
`;

const StyledLabel = styled.label`
	display: flex;
	flex-direction: column;
	gap: 4px;
	font-size: 12px;
	color: ${(props) => props.theme.textGray};
`;

function InputBasic({
	value,
	onChange,
	type = "text",
	name = "Input",
	placeholder = "",
	small = false,
}) {
	return (
		<StyledLabel>
			{name}
			<StyledInput
				small={small}
				value={value}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</StyledLabel>
	);
}

export default InputBasic;
