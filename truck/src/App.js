import "./App.css";
import React, { useState } from "react";

function App() {
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="App App-header">
			<form>
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
			</form>
		</div>
	);
}

export default App;
