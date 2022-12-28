import { useSelector } from "react-redux";
import { selectSubjectById } from "../app/selectors/subjectsSelectors";

export const useSubject = (subjectId) => {
	return useSelector((state) => selectSubjectById(state, subjectId));
};
