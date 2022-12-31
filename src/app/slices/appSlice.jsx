import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentSubjectId: -1,
	currentStatus: "list",
	currentLessonId: -1,
	savedAction: {},
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setCurrentSubject(state, action) {
			state.currentSubjectId = action.payload;
		},
		setCurrentStatus(state, action) {
			state.currentStatus = action.payload;
		},
		setCurrentLessonId(state, action) {
			state.currentLessonId = action.payload;
		},
	},
});

export const { setCurrentSubject, setCurrentStatus, setCurrentLessonId } =
	appSlice.actions;
export default appSlice.reducer;
