import React from "react"
import ButtonBasic from "../UI/Buttons/ButtonBasic"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { addSubjectThunk } from "../../app/slices/subjectsThunks"

const SubjectsAction = styled.div`
	display: flex;
	gap: 24px;
`
function SubjectActions(props) {
	const dispatch = useDispatch()
	const handleAddSubject = () => {
		dispatch(addSubjectThunk())
	}

	return (
		<SubjectsAction>
			<h2 className={"TabTitle"}>Мои предметы</h2>
			<ButtonBasic title={"Добавить"} callback={handleAddSubject} />
		</SubjectsAction>
	)
}

export default SubjectActions
