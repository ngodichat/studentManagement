const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const debug = require("debug");
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));

var students = require("./server/students/studentRoutes");
var sessions = require("./server/sessions/sessionRoutes");
app.use("/api/students", students);
app.use("/api/sessions", sessions);
app.get("/detail/:id", (req,res,next)=>{
  console.log(req.params.id);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

module.exports = app;