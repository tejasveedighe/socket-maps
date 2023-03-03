const app = require("express")();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log(`User Connected ${socket.id}`);
});

app.get("/", (req, res) => {
	res.send("<h1>Hello World</h1>");
});

server.listen(3001, () => console.log("server listening at 3001"));
