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

const subjectsSlice = createSlice({
	name: "subjects",
	initialState,
	reducers: {
		setSubject(state, action) {
			const payload = action.payload;
			const subjectId = payload.id;
			state[subjectId] = payload;
		},
	},
});

export const { setSubject, setSubjectSkills } = subjectsSlice.actions;

export default subjectsSlice.reducer;
