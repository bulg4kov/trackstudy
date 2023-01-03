import { useSelector } from "react-redux"
import { getSubjectById } from "../app/selectors/subjectsSelectors"

export const useSubject = subjectId => {
	return useSelector(state => getSubjectById(state, subjectId))
}
