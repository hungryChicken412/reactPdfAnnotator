import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<>
			<div className="App">
				<div className="title">
					{" "}
					<h2>Documents</h2>
				</div>

				<div className="li">
					<ul>
						<li>
							<Link
								to={{
									pathname: "/editor",
									search: "1",
								}}
							>
								Sample Document 1
							</Link>{" "}
						</li>
						<li>
							<Link
								to={{
									pathname: "/editor",
									search: "2",
								}}
							>
								Sample Document 2
							</Link>{" "}
						</li>
						<li>
							<Link
								to={{
									pathname: "/editor",
									search: "3",
								}}
							>
								Sample Document 3
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default App;
