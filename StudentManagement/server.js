const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const debug = require("debug");

const app = express();
// const firebase = require("firebase");
// var config = {
//   apiKey: "AIzaSyDewV3yFu0J-lq0gt86wTSqeEoiRvw9dcM",
//   authDomain: "studentmanagement-1fc5a.firebaseapp.com",
//   databaseURL: "https://studentmanagement-1fc5a.firebaseio.com",
//   projectId: "studentmanagement-1fc5a",
//   storageBucket: "studentmanagement-1fc5a.appspot.com",
//   messagingSenderId: "792674033737"
// };
// firebase.initializeApp(config);

// const dataRef = firebase.database();
// dataRef.on('value', snap =>{
//     console.log(snap.val())
// });

// view-engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));

var students = require("./server/routes/students");
app.use("/api/students", students);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
