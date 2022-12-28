import { createSlice } from "@reduxjs/toolkit";
import { getSubjects, setSubjects } from "../../utils/storage";
import fakesubjects from "../fakedata/subjects.json";
import { changeCurrentStatus, changeCurrentSubject } from "./appSlice";

const subjectFromStorage = getSubjects();
const initialState =
	subjectFromStorage !== null ? subjectFromStorage : fakesubjects;

function calculateNewTotalSkill(skills) {
	let res = 0;
	skills.forEach((skill) => {
		res += skill.progress;
	});
	return res / skills.length;
}

export const editSubject = (subject) => (dispatch, getState) => {
	dispatch(setSubject(subject));
	setSubjects(getState().subjects);
};

export const addSubjectSkillPointThunk =
	(subjectId, skillIds) => (dispatch, getState) => {
		dispatch(
			addSubjectSkillPoint({
				subjectId: subjectId,
				skillIds: skillIds,
			})
		);
		setSubjects(getState().subjects);
	};

export const addNewLesson = (subjectId, newLesson) => (dispatch, getState) => {
	dispatch(
		editLessons({
			subjectId: subjectId,
			newLesson: newLesson,
		})
	);
	setSubjects(getState().subjects);
};

export const editSubjectLesson =
	(subjectId, lesson) => (dispatch, getState) => {
		dispatch(
			editLesson({
				subjectId: subjectId,
				lesson: lesson,
			})
		);
		setSubjects(getState().subjects);
	};

export const removeSubjectById = (subjectId) => (dispatch, getState) => {
	dispatch(changeCurrentStatus("LIST"));
	dispatch(changeCurrentSubject(-1));
	dispatch(removeSubject({ id: subjectId }));
	setSubjects(getState().subjects);
};

export const addSubjectThunk = () => (dispatch, getState) => {
	const newSubjectId = getState().subjects.length + 1;
	dispatch(addSubject(newSubjectId));
	dispatch(changeCurrentStatus("edit"));
	dispatch(changeCurrentSubject(newSubjectId));
	setSubjects(getState().subjects);
};

function getSubjectIndex(subjects, id) {
	return subjects.findIndex((subject) => subject.id === id);
}

const subjectsSlice = createSlice({
	name: "subjects",
	initialState,
	reducers: {
		setSubject(state, action) {
			const payload = action.payload;
			const subjectId = payload.id;
			const currentSubject = state[getSubjectIndex(state, subjectId)];
			currentSubject.totalSkill = calculateNewTotalSkill(currentSubject.skills);
			state[getSubjectIndex(state, subjectId)] = payload;
		},
		removeSubject(state, action) {
			const payload = action.payload;
			const subjectId = payload.id;
			return state.filter((subject) => subject.id !== subjectId);
		},
		addSubject(state, action) {
			const newSubjectId = action.payload;
			const newSubject = {
				id: newSubjectId,
				name: "Мой предмет",
				description: "",
				color: "orange",
				totalSkill: 0,
				lessons: [],
				skills: [],
				materials: [],
			};
			state.push(newSubject);
		},
		addSubjectSkillPoint(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const skillIds = payload.skillIds;
			const currentSubject = state[getSubjectIndex(state, subjectId)];
			const skills = currentSubject.skills;
			skills.forEach((skill) => {
				if (skillIds.includes(skill.id)) {
					skill.progress++;
				}
			});
			currentSubject.totalSkill = calculateNewTotalSkill(skills);
		},
		editLessons(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const newLesson = payload.newLesson;
			state[getSubjectIndex(state, subjectId)].lessons.push(newLesson);
		},
		editLesson(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const newLesson = payload.lesson;
			const lessonIndex = state[
				getSubjectIndex(state, subjectId)
			].lessons.findIndex((lesson) => lesson.id == newLesson.id);
			state[getSubjectIndex(state, subjectId)].lessons[lessonIndex] = newLesson;
		},
	},
});

export const {
	setSubject,
	setSubjectSkills,
	addSubjectSkillPoint,
	editLessons,
	editLesson,
	removeSubject,
	addSubject,
} = subjectsSlice.actions;

export default subjectsSlice.reducer;
