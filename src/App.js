import React from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Subjects from "./components/SubjectsList/Subjects";
import { useSelector } from "react-redux";
import SubjectCard from "./components/Subject/SubjectCard";
import SubjectCardEdit from "./components/Subject/SubjectCardEdit";
import { getAppState, getCurrentSubjectId } from "./app/selectors/appSelectors";
import { getAllSubjectsIds } from "./app/selectors/subjectsSelectors";

const StyledApp = styled.main`
	width: 1440px;
`;

const StyledContainer = styled.div`
	width: 100%;
	display: flex;
	margin-top: 72px;
	gap: 142px;
`;

function App() {
	const currentSubjectId = useSelector((state) => getCurrentSubjectId(state));
	const allSubjectsIds = useSelector((state) => getAllSubjectsIds(state));

	const appState = useSelector((state) => getAppState(state));

	return (
		<StyledApp>
			<Header />
			<StyledContainer>
				<Subjects />
				{appState.currentStatus === "view" &&
				currentSubjectId !== -1 &&
				allSubjectsIds.includes(currentSubjectId) ? (
					<SubjectCard currentSubjectId={currentSubjectId} />
				) : appState.currentStatus === "edit" &&
				  currentSubjectId !== -1 &&
				  allSubjectsIds.includes(currentSubjectId) ? (
					<SubjectCardEdit currentSubjectId={currentSubjectId} />
				) : null}
			</StyledContainer>
		</StyledApp>
	);
}

export default App;
