var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
var students;

var db;

/**
 * Connect to Mongo DB
 */
MongoClient.connect(
  "mongodb://test:123456@ds163340.mlab.com:63340/heroku_59pxw6v8",
  (err, database) => {
    if (!err) {
      console.log("DB Connected");
      var currentDB = database.db("heroku_59pxw6v8");
      db = currentDB;
      //   var collection = this.db.collection("students");
      //   collection.find().toArray((err, items) => {
      //     console.log(items);
      //   });
    } else {
      console.log("Can't connect to Mongo DB");
    }
  }
);

/* GET users listing. */
const dataLink = "src/assets/data.json";
fs.readFile(dataLink, "utf8", (err, data) => {
  if (err) throw err;
  students = JSON.parse(data);
  // console.log(students["studentsList"]);
});

router.get("/:id", (req, res, next) => {
  console.log("Received student detail request");
  const req_id = req.params.id;
  const studentCollection = db.collection("students");
  var objID = new mongo.ObjectId(req_id);
  studentCollection.find({ _id: objID }).toArray((err, items) => {
    res.send(items);
  });
});

router.get("/", function(req, res, next) {
  //   res.send('this is students js');
  //   res.send(students["studentsList"]);
  console.log("Received get all students");
  var collection = db.collection("students");
  collection.find().toArray((err, items) => {
    // console.log(items);
    if (err) res.status(401);
    else res.status(200);
    res.json(items);
  });
});

router.put("/update/", (req, res, next) => {
  console.log("Update student");
  // console.log(req.body);
  var student = req.body;
  // console.log(student["_id"]);
  var collection = db.collection("students");
  var objID = new mongo.ObjectId(student["_id"]);
  student["_id"] = objID;
  collection.update({ _id: objID }, student);
});

router.delete("/delete/:id", (req, res, next) => {
  var studentId = req.params.id;
  console.log("Delete student" + studentId);
  var objID = new mongo.ObjectID(studentId);
  var collection = db.collection("students");
  collection.deleteOne({ _id: objID });
});

module.exports = router;
