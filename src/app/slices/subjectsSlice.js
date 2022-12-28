import { createSlice } from "@reduxjs/toolkit";
import { getSubjects, setSubjects } from "../../utils/storage";
import fakesubjects from "../fakedata/subjects.json";

const subjectFromStorage = getSubjects();
const initialState =
	subjectFromStorage !== null ? subjectFromStorage : fakesubjects;

export const editSubject = (subject) => (dispatch, getState) => {
	dispatch(setSubject(subject));
	setSubjects(getState().subjects);
};

export const addSubjectSkillPointThunk =
	(subjectId, skillIds) => (dispatch, getState) => {
		dispatch(
			addSubjectSkillPoint({
				subjectId: subjectId,
				skillIds: skillIds,
			})
		);
		setSubjects(getState().subjects);
	};

const subjectsSlice = createSlice({
	name: "subjects",
	initialState,
	reducers: {
		setSubject(state, action) {
			const payload = action.payload;
			const subjectId = payload.id;
			state[subjectId] = payload;
		},
		addSubjectSkillPoint(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const skillIds = payload.skillIds;
			const skills = state[subjectId].skills;
			skills.forEach((skill) => {
				if (skillIds.includes(skill.id)) {
					skill.progress++;
				}
			});
		},
	},
});

export const { setSubject, setSubjectSkills, addSubjectSkillPoint } =
	subjectsSlice.actions;

export default subjectsSlice.reducer;
