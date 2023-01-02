import React, { useState, useRef, useEffect } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import { Router } from "react-router-dom";

function Editor() {
	const router = Router;
	const [page, setPage] = useState(1);
	const canvasRef = useRef(null);
	const [rectMode, setRectMode] = useState("title");
	const [boxesMemory, setBoxes] = useState([]);
	const [lastSession, setLastSession] = useState(false);

	var boxes = [];
	let pdfUrl = "";
	const pdfID = {
		1: "https://arxiv.org/pdf/2212.08011.pdf",
		2: "https://arxiv.org/pdf/2212.07937.pdf",
		3: "https://arxiv.org/pdf/2212.07931.pdf",
	};

	const { pdfDocument, pdfPage } = usePdf({
		file: pdfID[window.location.href.split("?")[1]],
		page,
		canvasRef,
	}); // draw rectangle
	const drawRect = (info, style = {}) => {
		const { x, y, w, h } = info;
		const { backgroundColor = "black" } = style;

		var ctx = canvasRef.current.getContext("2d");

		ctx.beginPath();
		ctx.fillStyle = backgroundColor;

		// log canvas width and height

		ctx.fillRect(x, y, w, h);
	};
	function nowDrawTitlerect() {
		const r1Info = { x: 20, y: 30, w: 100, h: 50 };
		const r1Style = {
			borderColor: "#ee7d31",
			borderWidth: 10,
			backgroundColor: "#ee7d314a",
		};
		drawRect(r1Info, r1Style);
	}
	function nowDrawAuthorrec() {
		const r1Info = { x: 20, y: 30, w: 100, h: 50 };
		const r1Style = {
			borderColor: "#71ac47",
			borderWidth: 10,
			backgroundColor: "#71ac474a",
		};
		drawRect(r1Info, r1Style);
	}

	var drawing = false;
	var mousePos = { x0: 0, y0: 0, x1: 0, y1: 0 };

	useEffect(() => {
		canvasRef.current.style.width = canvasRef.current.width + " !important";
		canvasRef.current.style.height =
			canvasRef.current.height + " !important";
	}, []);

	function startDrawingRectangle(event) {
		drawing = true;

		var rect = canvasRef.current.getBoundingClientRect();
		mousePos.x0 = event.clientX - rect.left;
		mousePos.y0 = event.clientY - rect.top;
		const r1Info = { x: mousePos.x0, y: mousePos.y0, w: 100, h: 50 };
	}

	useEffect(() => {
		console.log("loaded");
		console.log(canvasRef.current.getContext("2d"));

		if (
			localStorage.getItem("boxes" + window.location.href.split("?")[1])
		) {
			var historyBox = JSON.parse(
				localStorage.getItem(
					"boxes" + window.location.href.split("?")[1]
				)
			);
			setBoxes(historyBox);
			load();
			if (historyBox.length > 0) setLastSession(true);
		} else {
			localStorage.setItem(
				"boxes" + window.location.href.split("?")[1],
				JSON.stringify(boxesMemory)
			);
		}
	}, []);

	function stopDrawingRectangle(event) {
		if (!drawRect) return;
		drawing = false;

		var rect = canvasRef.current.getBoundingClientRect();
		mousePos.x1 = event.clientX - rect.left;
		mousePos.y1 = event.clientY - rect.top;

		const r1Info = {
			x: mousePos.x0,
			y: mousePos.y0,
			w: mousePos.x1 - mousePos.x0,
			h: mousePos.y1 - mousePos.y0,
		};
		localStorage.setItem(
			"boxes" + window.location.href.split("?")[1],
			JSON.stringify([
				...boxesMemory,
				{
					x: mousePos.x0,
					y: mousePos.y0,
					w: mousePos.x1 - mousePos.x0,
					h: mousePos.y1 - mousePos.y0,
					type: rectMode,
				},
			])
		);
		setBoxes([
			...boxesMemory,
			{
				x: mousePos.x0,
				y: mousePos.y0,
				w: mousePos.x1 - mousePos.x0,
				h: mousePos.y1 - mousePos.y0,
				type: rectMode,
			},
		]);

		if (rectMode == "title") {
			const r1Style = {
				borderColor: "orange",
				borderWidth: 10,
				backgroundColor: "#ee7d314a",
			};

			drawRect(r1Info, r1Style);
		} else if (rectMode == "author") {
			const r1Style = {
				borderColor: "green",
				borderWidth: 10,
				backgroundColor: "#71ac474a",
			};
			drawRect(r1Info, r1Style);
		}
	}

	function drawModeTitle() {
		setRectMode("title");
	}
	function drawModeAuthor() {
		setRectMode("author");
	}
	function load() {
		localStorage.setItem(
			"boxes" + window.location.href.split("?")[1],
			JSON.stringify(boxesMemory)
		);
		console.log("asdsad");

		setLastSession(false);

		boxesMemory.forEach((element) => {
			if (element.type == "title") {
				const r1Style = {
					borderColor: "orange",
					borderWidth: 10,
					backgroundColor: "#ee7d314a",
				};
				drawRect(element, r1Style);
				console.log("sdkjfb");
			} else {
				const r1Style = {
					borderColor: "green",
					borderWidth: 10,
					backgroundColor: "#71ac474a",
				};
				drawRect(element, r1Style);
			}
		});
	}

	function clear() {
		localStorage.removeItem("boxes" + window.location.href.split("?")[1]);
		window.location.reload();
	}
	return (
		<div className="editor">
			<div className="editor-panel">
				<div>
					<div className="editor-panel-header title">
						<h3>Editor</h3>
					</div>
					<div className="editor-panel-body">
						{" "}
						<button
							className="edit-title-button"
							onClick={drawModeTitle}
						>
							Title
						</button>
						<button
							className="edit-author-button"
							onClick={drawModeAuthor}
						>
							Author
						</button>
					</div>
					<div>Annotating: {rectMode}</div>
					{boxesMemory.length > 0 && (
						<button onClick={clear} className="Misc-button">
							Clear
						</button>
					)}

					{lastSession && (
						<button onClick={load} className="Misc-button">
							Load Last Session{" "}
						</button>
					)}
				</div>

				<div>
					<div className="editor-panel-header title">
						<h3>Boxes</h3>
					</div>
					<div className="editor-panel-body">
						{" "}
						{boxesMemory.map((box, index) => (
							<div className="box-info" key={index}>
								<span className="box-info-x">
									X: {parseInt(box.x)}
								</span>
								<span className="box-info-y">Y: {box.y}</span>
								<span className="box-info-w">
									Width: {box.w}
								</span>
								<span className="box-info-h">
									Height: {box.h}
								</span>
								<span className="box-info-t">
									Type:
									{box.type == "title" ? (
										<button className="edit-title-button">
											Title
										</button>
									) : (
										<button className="edit-author-button">
											Author
										</button>
									)}
								</span>
							</div>
						))}
					</div>{" "}
				</div>
			</div>
			<div className="editor-screen">
				{!pdfDocument && <span>Loading...</span>}
				<canvas
					id="canvas"
					ref={canvasRef}
					onMouseUp={stopDrawingRectangle}
					onMouseDown={startDrawingRectangle}
				/>
			</div>
		</div>
	);
}

export default Editor;
