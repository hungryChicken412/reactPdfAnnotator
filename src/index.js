import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Edit from "./Pages/Edit";

const routing = (
	<Router>
		<div>
			<Routes>
				<Route path="/" element={<App />} exact></Route>
				<Route path="/editor" element={<Edit />}></Route>
			</Routes>
		</div>
	</Router>
);
ReactDOM.render(routing, document.getElementById("root"));
