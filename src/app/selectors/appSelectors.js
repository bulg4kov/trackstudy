import { createSelector } from "@reduxjs/toolkit";

export const getAppState = createSelector(
	(state) => state.app,
	(app) => app
);

export const getCurrentSubjectId = createSelector(
	(state) => state.app,
	(appState) => appState.currentSubjectId
);
