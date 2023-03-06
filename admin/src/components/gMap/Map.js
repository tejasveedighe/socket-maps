import React, { useState, useRef, useEffect } from "react";
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker,
	Polyline,
} from "react-google-maps";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import "../../App.css";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Map = (props) => {
	const icon1 = {
		url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
		scaledSize: new window.google.maps.Size(40, 40),
		anchor: new window.google.maps.Point(20, 20),
		scale: 0.7,
	};

	const options = { strokeColor: "orange" };
	const [progress, setProgress] = useState([
		{ lat: 18.566516, lng: -68.435996 },
	]);
	let coords = 1;
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			coords = position.coords;
		});
		socket.on("send_cord", (data) => {
			setProgress([
				...progress,
				{
					lat: parseFloat(Number(data.lat)),
					lng: parseFloat(Number(data.lng)),
				},
			]);
			console.count("progress", progress);
		});
	}, []);
	let centerPathLat = progress[0].lat;
	let centerpathLng = progress[0].lng;
	return (
		<Card variant="outlined">
			<div className="gMapCont">
				<GoogleMap
					defaultZoom={17}
					defaultCenter={{ lat: centerPathLat, lng: centerpathLng }}
				>
					<>
						<Polyline path={progress} options={options} />
						<Marker ico={icon1} position={progress[progress.length - 1]} />
					</>
				</GoogleMap>
			</div>
		</Card>
	);
};

const Poly = (props) => {
	const [progress, setProgress] = useState([props.path[0]]);
	const [i, setI] = useState(1);
	const polyRef = useRef();
	const handleClick = () => {
		if (i === props.path.length) {
			setI(0);
			setProgress([]);
			polyRef.current.props.path = [];
		}
		setProgress([...progress, props.path[i]]);
		setI(i + 1);
	};
	return (
		<>
			<Polyline path={progress} options={props.options} ref={polyRef} />
			<Marker icon={props.icon1} position={progress[progress.length - 1]} />
			<div className="btn">
				<Button variant="container" onClick={handleClick}>
					Move {props.index}
				</Button>
			</div>
		</>
	);
};

export default withScriptjs(withGoogleMap(Map));
