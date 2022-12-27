import { createSlice } from "@reduxjs/toolkit";
import fakeSubjects from "../fakedata/subjects.json";

const initialState = fakeSubjects;

const subjectsSlice = createSlice({
	name: "subjects",
	initialState,
});
export default subjectsSlice.reducer;
