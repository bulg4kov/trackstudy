import React from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Subjects from "./components/Subjects/Subjects";

const StyledApp = styled.main`
	width: 1440px;
	height: 100%;
`;

const StyledContainer = styled.div`
	width: 100%;
	display: flex;
	margin-top: 72px;
`;

function App() {
	return (
		<StyledApp>
			<Header />
			<StyledContainer>
				<Subjects />
			</StyledContainer>
		</StyledApp>
	);
}

export default App;
