import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentSubjectId: undefined,
	currentStatus: "LIST",
	savedAction: {},
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		changeCurrentSubject(state, action) {
			state.currentSubjectId = action.payload.newId;
		},
		changeCurrentStatus(state, action) {
			state.currentStatus = action.payload;
		},
	},
});

export const { changeCurrentSubject, changeCurrentStatus } = appSlice.actions;
export default appSlice.reducer;
