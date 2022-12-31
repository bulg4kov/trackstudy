// Thunk для редактирования предмета. На вход принимает новый объект предмета (NB: subject.id не должен изменятся в новом объект)
import { setSubjectsInStorage } from "../../utils/storage";
import {
	setCurrentLessonId,
	setCurrentStatus,
	setCurrentSubject,
} from "./appSlice";
import {
	addLesson,
	addMaterial,
	addSubject,
	addSubjectSkill,
	addSubjectSkillPoint,
	editLesson,
	editSkill,
	generateLessonId,
	generateMaterialId,
	generateSkillId,
	generateSubjectId,
	removeSkill,
	removeSubject,
	setLessonStatus,
	setSubject,
} from "./subjectsSlice";

export const editSubjectThunk =
	(subjectId, subject) => (dispatch, getState) => {
		dispatch(setSubject({ id: subjectId, data: subject }));
		setSubjectsInStorage(getState().subjects);
	};
export const addSubjectSkillThunk = (subjectId) => (dispatch, getState) => {
	const skillId = generateSkillId();
	dispatch(addSubjectSkill({ skillId: skillId, subjectId: subjectId }));
	setSubjectsInStorage(getState().subjects);
};
// Thunk для добавления очка навыка для предмета, на вход id предета и id навыка для этого предмета
export const addSubjectSkillPointThunk =
	(subjectId, lessonId) => (dispatch, getState) => {
		dispatch(
			addSubjectSkillPoint({
				subjectId: subjectId,
				lessonId: lessonId,
			})
		);
		setSubjectsInStorage(getState().subjects);
	};
// Thunk для добавления нового занятия для предмет. На вход id предмета и объект нового урока
export const addNewLessonThunk =
	(subjectId, newLesson) => (dispatch, getState) => {
		const lessonId = generateLessonId();
		dispatch(
			addLesson({
				subjectId: subjectId,
				lesson: newLesson,
				lessonId: lessonId,
			})
		);
		dispatch(setCurrentLessonId(lessonId));
		setSubjectsInStorage(getState().subjects);
	};
// Thunk для редактирования занятия выбранного предмета, на вход принимает id предмета и объект нового урока
export const editSubjectLessonThunk =
	(subjectId, lesson, lessonId) => (dispatch, getState) => {
		dispatch(
			editLesson({
				subjectId: subjectId,
				lesson: lesson,
				lessonId: lessonId,
			})
		);
		setSubjectsInStorage(getState().subjects);
	};
export const setSubjectLessonStatusThunk =
	(subjectId, lessonId, newStatus) => (dispatch, getState) => {
		dispatch(
			setLessonStatus({
				lessonId: lessonId,
				subjectId: subjectId,
				status: newStatus,
			})
		);
		setSubjectsInStorage(getState().subjects);
	};
// Thunk для удаления предмета, на вход принимает id предмета
// Также ставит состояние приложения в просмотр доступных предметов и убирает id текущего предмета для просмотра
export const removeSubjectThunk = (subjectId) => (dispatch, getState) => {
	dispatch(setCurrentStatus("LIST"));
	dispatch(setCurrentSubject(-1));
	dispatch(removeSubject({ id: subjectId }));
	setSubjectsInStorage(getState().subjects);
};
// Thunk для добавления нового предмета, внутри генерирует id нового предмета, на вход не принимает ничего
// Также ставит состояние приложения в редактирование предмета и ставит id текущего предмета на новый id
export const addSubjectThunk = () => (dispatch, getState) => {
	const newSubjectId = generateSubjectId();
	dispatch(addSubject(newSubjectId));
	dispatch(setCurrentStatus("edit"));
	dispatch(setCurrentSubject(newSubjectId));
	setSubjectsInStorage(getState().subjects);
};
export const addSubjectMaterialThunk =
	(subjectId, data) => (dispatch, getState) => {
		const newMaterialId = generateMaterialId();
		dispatch(
			addMaterial({
				materialId: newMaterialId,
				subjectId: subjectId,
				data: data,
			})
		);
		setSubjectsInStorage(getState().subjects);
	};
export const editSubjectSkillThunk =
	(subjectId, skillId, type, data) => (dispatch, getState) => {
		dispatch(
			editSkill({
				subjectId: subjectId,
				skillId: skillId,
				skillType: type,
				skillData: data,
			})
		);
		setSubjectsInStorage(getState().subjects);
	};

export const removeSubjectSkillThunk =
	(subjectId, skillId) => (dispatch, getState) => {
		dispatch(
			removeSkill({
				subjectId: subjectId,
				skillId: skillId,
			})
		);
	};
