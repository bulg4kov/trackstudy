import { createSelector } from "@reduxjs/toolkit";

// Получение основного состояния приложения
export const getAppState = createSelector(
	(state) => state.app,
	(app) => app
);

// Получение ID текущего предмета, выбранного для просмотра
export const getCurrentSubjectId = createSelector(
	(state) => state.app,
	(appState) => appState.currentSubjectId
);
