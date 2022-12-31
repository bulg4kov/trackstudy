import { createSlice } from "@reduxjs/toolkit";
import { getSubjectsFromStorage } from "../../utils/storage";
import { nanoid } from "nanoid";

const subjectFromStorage = getSubjectsFromStorage();
// Начальное состояние, если localstorage пустой берём из JSON файла, иначе - из localstorage
const initialState = subjectFromStorage !== null ? subjectFromStorage : {};

// Расчёт нового значения общего прогресса для предмета на основании его побочных навыков
export function calculateNewTotalSkill(skills) {
	if (Object.keys(skills).length < 1) {
		return 0;
	}
	let res = 0;
	Object.values(skills).forEach((skill) => {
		res += skill.progress;
	});
	if (res === 0) {
		return 0;
	}
	res = res / Object.keys(skills).length;
	// Возвращает округление до сотых
	return Math.round(res * 100) / 100;
}

export function generateSubjectId() {
	return nanoid();
}

export function generateLessonId() {
	return nanoid();
}

export function generateSkillId() {
	return nanoid();
}

export function generateMaterialId() {
	return nanoid();
}

const subjectsSlice = createSlice({
	name: "subjects",
	initialState,
	reducers: {
		setSubject(state, action) {
			const payload = action.payload;
			const subjectId = payload.id;
			const newSubject = payload.data;
			state[subjectId] = newSubject;
			state[subjectId].totalSkill = calculateNewTotalSkill(
				state[subjectId].skills
			);
		},
		removeSubject(state, action) {
			const payload = action.payload;
			const subjectId = payload.id;
			delete state[subjectId];
		},
		addSubject(state, action) {
			const newSubjectId = action.payload;
			const newSubject = {
				name: "Мой предмет",
				description: "",
				color: "orange",
				totalSkill: 0,
				lessons: {},
				skills: {},
				materials: {},
			};
			state[newSubjectId] = newSubject;
		},
		addSubjectSkill(state, action) {
			const payload = action.payload;
			const skillId = action.payload.skillId;
			const subjectId = action.payload.subjectId;
			const skill = {
				color: "orange",
				name: "",
				progress: 0,
			};
			state[subjectId].skills[skillId] = skill;
		},
		addSubjectSkillPoint(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const lessonId = payload.lessonId;
			const skills = state[subjectId].lessons[lessonId].skills;
			skills.map((key) => {
				state[subjectId].skills[key].progress += 1;
			});
			state[subjectId].totalSkill = calculateNewTotalSkill(
				state[subjectId].skills
			);
		},
		addMaterial(state, action) {
			const payload = action.payload;
			const newMaterialId = payload.materialId;
			const subjectId = payload.subjectId;
			const newMaterial = payload.data;
			state[subjectId].materials[newMaterialId] = newMaterial;
		},
		addLesson(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const newLesson = payload.lesson;
			const newLessonId = payload.lessonId;
			state[subjectId].lessons[newLessonId] = newLesson;
		},
		editLesson(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const newLesson = payload.lesson;
			const lessonId = payload.lessonId;
			state[subjectId].lessons[lessonId] = newLesson;
		},
		setLessonStatus(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const lessonId = payload.lessonId;
			const newStatus = payload.status;
			state[subjectId].lessons[lessonId].status = newStatus;
		},
		editSkill(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const skillId = payload.skillId;
			let skillData = payload.skillData;
			const skillType = payload.skillType;
			state[subjectId].skills[skillId][skillType] = skillData;
		},
		removeSkill(state, action) {
			const payload = action.payload;
			const subjectId = payload.subjectId;
			const skillId = payload.skillId;
			delete state[subjectId].skills[skillId];
		},
	},
});

export const {
	setSubject,
	setSubjectSkills,
	addSubjectSkillPoint,
	addLesson,
	editLesson,
	setLessonStatus,
	removeSubject,
	addSubject,
	addSubjectSkill,
	addMaterial,
	editSkill,
	removeSkill,
} = subjectsSlice.actions;

export default subjectsSlice.reducer;
