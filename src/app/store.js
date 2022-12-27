import { configureStore } from "@reduxjs/toolkit";
import subjectsSlice from "./slices/subjectsSlice";
import appSlice from "./slices/appSlice";

export const store = configureStore({
	reducer: {
		app: appSlice,
		subjects: subjectsSlice,
	},
});
