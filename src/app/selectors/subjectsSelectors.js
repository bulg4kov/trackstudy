import { createSelector } from "@reduxjs/toolkit";

export const selectSubjectById = createSelector(
	[(state) => state.subjects, (state, id) => id],
	(subjects, id) => subjects.filter((subject) => subject.id === id)[0]
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
	[(state, subjectId) => state.subjects[subjectId]],
	(subject, subjectId) => {
		return JSON.parse(JSON.stringify(subject.lessons)).sort(compareLessonsDate);
	}
);
