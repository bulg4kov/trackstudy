import { createSelector } from "@reduxjs/toolkit";

export const selectSubjectById = createSelector(
	[(state) => state.subjects, (state, id) => id],
	(subjects, id) => subjects.filter((subject) => subject.id === id)[0]
);
