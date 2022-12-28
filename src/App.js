import React from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Subjects from "./components/SubjectsList/Subjects";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import SubjectCard from "./components/Subject/SubjectCard";
import SubjectCardEdit from "./components/Subject/SubjectCardEdit";

const StyledApp = styled.main`
	width: 1440px;
`;

const StyledContainer = styled.div`
	width: 100%;
	display: flex;
	margin-top: 72px;
	gap: 142px;
`;

const selectSubjectById = createSelector(
	[(state) => state.subjects, (state, id) => id],
	(subjects, id) => subjects.filter((subject) => subject.id === id)[0]
);

const getCurrentSubjectId = createSelector(
	(state) => state.app,
	(appState) => appState.currentSubjectId
);

function App() {
	const currentSubjectId = useSelector((state) => getCurrentSubjectId(state));

	const appState = useSelector((state) => state.app);

	return (
		<StyledApp>
			<Header />
			<StyledContainer>
				<Subjects />
				{appState.currentStatus === "view" && currentSubjectId !== undefined ? (
					<SubjectCard currentSubjectId={currentSubjectId} />
				) : appState.currentStatus === "edit" &&
				  currentSubjectId !== undefined ? (
					<SubjectCardEdit currentSubjectId={currentSubjectId} />
				) : null}
			</StyledContainer>
		</StyledApp>
	);
}

export default App;
