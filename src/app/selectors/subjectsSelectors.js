import { createSelector } from "@reduxjs/toolkit";

// Получение предмета по его ID
export const getSubjectById = createSelector(
	[(state) => state.subjects, (state, id) => id],
	(subjects, id) => {
		return subjects[id];
	}
);

// Получение всех ID всех предметов
export const getAllSubjectsIds = createSelector(
	(state) => state.subjects,
	(subjects) => Object.keys(subjects)
);

// Сравнение времени занятия для сортировка
function compareLessonsTime(a, b) {
	if (a.time < b.time) {
		return -1;
	}
	if (a.time > b.time) {
		return 1;
	}
	return 0;
}

// Получение всех занятий для предмета по ID, на выходе отсорированный массив через сравнение compareLessonsDate
export const getLessonsForSubject = createSelector(
	[(state, subjectId) => state.subjects[subjectId]],
	(subject) => subject.lessons
);

export const getLessonById = createSelector(
	[
		(state, subjectId) => state.subjects[subjectId].lessons,
		(state, subjectId, lessonsId) => lessonsId,
	],
	(lessons, lessonId) => lessons[lessonId]
);

export const getMaterialsForSubject = createSelector(
	[(state, subjectId) => state.subjects[subjectId]],
	(subject) => subject.materials
);

export const getSkillsForSubject = createSelector(
	[(state, subjectId) => state.subjects[subjectId]],
	(subject) => subject.skills
);
