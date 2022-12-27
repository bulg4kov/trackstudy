import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentSubjectId: undefined,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		changeCurrentSubject(state, action) {
			state.currentSubjectId = action.payload.newId;
		},
	},
});

export const { changeCurrentSubject } = appSlice.actions;
export default appSlice.reducer;
