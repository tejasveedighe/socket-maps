import "./App.css";
import io from "socket.io-client";
import React, { useEffect } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
	useEffect(() => {
		socket.emit("admin", { msg: "Hello" });
	}, []);

	return <div className="App"></div>;
}

export default App;
