import React from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Subjects from "./components/SubjectsList/Subjects";
import { useSelector } from "react-redux";
import SubjectCard from "./components/Subject/SubjectCard";
import SubjectCardEdit from "./components/Subject/SubjectCardEdit";
import { getAppState, getCurrentSubjectId } from "./app/selectors/appSelectors";

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

	const appState = useSelector((state) => getAppState(state));

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
