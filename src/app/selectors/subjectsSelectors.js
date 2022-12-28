import { createSelector } from "@reduxjs/toolkit";

export const selectSubjectById = createSelector(
	(state) => state.subjects,
	(state, id) => id,
	(subjects, id) => {
		return subjects.filter((subject) => subject.id == id)[0];
	}
	// (subjects, id) => subjects.find((subject) => subject.id === id)
);

export const getAllSubjectsIds = createSelector(
	(state) => state.subjects,
	(subjects) => subjects.map((subject) => subject.id)
);

function compareLessonsDate(a, b) {
	if (a.time < b.time) {
		return -1;
	}
	if (a.time > b.time) {
		return 1;
	}
	return 0;
}

export const getLessonsForSubject = createSelector(
	[
		(state, subjectId) =>
			state.subjects.find((subject) => subject.id == subjectId),
	],
	(subject, subjectId) => {
		if (subject !== undefined) {
			return JSON.parse(JSON.stringify(subject.lessons)).sort(
				compareLessonsDate
			);
		}
	}
);
