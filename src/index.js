import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const container = document.getElementById("root");
const root = createRoot(container);

const GlobalStyle = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
    font-family: Roboto;
	}
	body{
		display: flex;
		justify-content: center;
		padding: 16px;
	}
`;

const Theme = {
	textPrimary: "#000",
	textGray: "#4B4B4B",
	bgPrimary: "#EDFFFA",
	buttonBg: "#EDFFFA",
	buttonText: "#219A79",
	cardBg: {
		orange: "#FFFCF4",
		green: "#DBFFD6",
		blue: "#B1ECFF",
		red: "#FFB1B1",
	},
	cardPrimary: {
		orange: "#FFA800",
		green: "#00FF19",
		blue: "#00D1FF",
		red: "#FF0000",
	},
	cardSecondary: {
		orange: "#FFE08D",
		green: "#72C17A",
		blue: "#72AEC1",
		red: "#FFB1B1",
	},
};

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={Theme}>
				<GlobalStyle />
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
