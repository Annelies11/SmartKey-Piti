const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const http = require("http");
const { Server } = require("socket.io");

const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Tambahkan middleware express.static untuk folder "views"
app.use(express.static(__dirname + "/views"));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

io.on("connection", (socket) => {
  console.log("connected...");
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(3000, () => {
  console.log("server on!");
});

// konektifitas serial arduino
const port = new SerialPort({
  path: "COM4",
  // path: "COM12",
  baudRate: 9600,
});

// parsing data dari arduino
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// tangkap data dari arduino
parser.on("data", (res) => {
  console.log(`data dari Arduino : ${res}`);
  io.emit("data", { data: res });
});

app.post("/arduinoApi", (req, res) => {
  const data = req.body.data;
  port.write(data, (err) => {
    if (err) {
      console.log("error : ", err);
      res.status(500).json({ error: "write data error!" });
    }
    console.log(`data terkirim ${data}`);
    res.end();
  });
});
