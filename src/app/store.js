import { configureStore } from "@reduxjs/toolkit";
import subjectsSlice from "./slices/subjectsSlice";

export const store = configureStore({
	reducer: {
		subjects: subjectsSlice,
	},
});
