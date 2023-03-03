const app = require("express")();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000", "http://localhost:3002"],
		methods: ["GET", "POST"],
	},
});

// when the user is connected to the server
io.on("connection", (socket) => {
	console.log(`User Connected ${socket.id}`);
	socket.on("new_cords", (data) => {
		const { lat, lng } = data;
		console.log(lat, lng);
		io.emit("send_cord", data);
	});
	socket.on("disconnect", () => console.log("A user Disconnected"));
});

// to check if the server is running
app.get("/", (req, res) => {
	res.send("<h1>Hello World</h1>");
});

server.listen(3001, () => console.log("server listening at 3001"));
