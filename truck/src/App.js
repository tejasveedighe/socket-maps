import "./App.css";
import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
	setTimeout(
		() =>
			navigator.geolocation.watchPosition(
				(position) => {
					console.count("timeout", position.coords);
					socket.emit("new_cords", {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				function error(msg) {
					alert("Please Enable your location access.");
				},
				{ maximumAge: 10000, timeout: 1000, enableHighAccuracy: true }
			),
		5000
	);

	return (
		<div className="App App-header">
			{/* <form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="lat">Latitude</label>
					<input
						id="lat"
						value={lat}
						type={"number"}
						placeholder={"Enter Latitude"}
						onChange={(event) => setLat(event.currentTarget.value)}
					/>
				</div>
				<div>
					<label htmlFor="lng">Longitude</label>
					<input
						id="lng"
						value={lng}
						type={"number"}
						placeholder={"Enter Longitude"}
						onChange={(event) => setLng(event.currentTarget.value)}
					/>
				</div>
				<button type="submit">Submit</button> 
			</form>
				*/}
		</div>
	);
}

export default App;
