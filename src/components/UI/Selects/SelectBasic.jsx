import React from "react"
import styled from "styled-components"

const StyledSelect = styled.select`
	border: 1px solid lightgray;
	border-radius: 16px;
	max-width: 150px;
	padding: 8px;
	background-color: #fff;
`

function SelectBasic({ options = [], value, onChange, ...props }) {
	return (
		<StyledSelect value={value} onChange={onChange}>
			{options.map(option => (
				<option value={option.value} key={option.value}>
					{option.name}
				</option>
			))}
		</StyledSelect>
	)
}

export default SelectBasic
