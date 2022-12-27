import React from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Subjects from "./components/SubjectsList/Subjects";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import SubjectCardEdit from "./components/Subject/SubjectCardEdit";
import SubjectCard from "./components/Subject/SubjectCard";

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

function App() {
	const currentSubjectId = useSelector((state) => state.app.currentSubjectId);

	const currentSubject = useSelector((state) =>
		selectSubjectById(state, currentSubjectId)
	);

	const appState = useSelector((state) => state.app);

	return (
		<StyledApp>
			<Header />
			<StyledContainer>
				<Subjects />
				{appState.currentStatus === "edit" && currentSubject !== undefined ? (
					<SubjectCardEdit subject={currentSubject} />
				) : appState.currentStatus === "view" &&
				  currentSubject !== undefined ? (
					<SubjectCard subject={currentSubject} />
				) : null}
			</StyledContainer>
		</StyledApp>
	);
}

export default App;
