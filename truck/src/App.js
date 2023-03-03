import "./App.css";
import React, { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit("new_cords", { lat, lng });
	};
	return (
		<div className="App App-header">
			<form onSubmit={handleSubmit}>
				<label htmlFor="lat">Latitude</label>
				<input
					id="lat"
					value={lat}
					placeholder={"Enter Latitude"}
					onChange={(event) => setLat(event.currentTarget.value)}
				/>
				<br />
				<label htmlFor="lng">Longitude</label>
				<input
					id="lng"
					value={lng}
					placeholder={"Enter Longitude"}
					onChange={(event) => setLng(event.currentTarget.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default App;
