import React from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Subjects from "./components/SubjectsList/Subjects";
import SubjectCard from "./components/Subject/SubjectCard";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const StyledApp = styled.main`
	width: 1440px;
	height: 100%;
`;

const StyledContainer = styled.div`
	width: 100%;
	display: flex;
	margin-top: 72px;
	gap: 142px;
`;

const selectSubjectById = createSelector(
	[(state) => state.subjects, (state, id) => id],
	(subjects, id) => subjects.filter((subject) => subject.id == id)[0]
);

function App() {
	const currentSubjectId = useSelector((state) => state.app.currentSubjectId);

	const currentSubject = useSelector((state) =>
		selectSubjectById(state, currentSubjectId)
	);

	return (
		<StyledApp>
			<Header />
			<StyledContainer>
				<Subjects />
				{currentSubject !== undefined ? (
					<SubjectCard subject={currentSubject} />
				) : null}
			</StyledContainer>
		</StyledApp>
	);
}

export default App;
