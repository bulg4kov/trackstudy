import React from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import Subject from "./Subject"
import { setCurrentStatus, setCurrentSubject } from "../../app/slices/appSlice"
import SubjectActions from "./SubjectActions"
import { getAllSubjectsIds } from "../../app/selectors/subjectsSelectors"

const SubjectsSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 32px;
	max-width: 450px;
`

const SubjectsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

function Subjects() {
	const subjectsIds = useSelector(getAllSubjectsIds)

	const dispatch = useDispatch()

	const onSubjectClick = (e, subjectId) => {
		dispatch(setCurrentSubject(subjectId))
		dispatch(setCurrentStatus("view"))
	}

	if (subjectsIds.length < 1) {
		return (
			<SubjectsSection>
				<SubjectActions />У вас пока нету предметов!
			</SubjectsSection>
		)
	}

	return (
		<SubjectsSection>
			<SubjectActions />
			<SubjectsList>
				{subjectsIds.map(subjectId => (
					<Subject
						subjectId={subjectId}
						onClick={onSubjectClick}
						key={subjectId}
					/>
				))}
			</SubjectsList>
		</SubjectsSection>
	)
}

export default Subjects
