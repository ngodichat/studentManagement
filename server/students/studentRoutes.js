var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
var students;

var db;
var sessionCollection = null;
var studentCollection = null;

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
      studentCollection = db.collection("students");
      sessionCollection = db.collection("sessions");
      //   collection.find().toArray((err, items) => {
      //     console.log(items);
      //   });
    } else {
      console.log("Can't connect to Mongo DB");
    }
  }
);

// /* GET users listing. */
// const dataLink = "src/assets/data.json";
// fs.readFile(dataLink, "utf8", (err, data) => {
//   if (err) throw err;
//   students = JSON.parse(data);
//   // console.log(students["studentsList"]);
// });

router.get("/:id", (req, res, next) => {
  console.log("Received student detail request");
  const req_id = req.params.id;
  var objID = new mongo.ObjectId(req_id);
  studentCollection.find({ _id: objID }).toArray((err, items) => {
    res.send(items);
  });
});

router.get("/", function(req, res, next) {
  //   res.send('this is students js');
  //   res.send(students["studentsList"]);
  console.log("Received get all students");
  studentCollection.find().toArray((err, items) => {
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
  var objID = new mongo.ObjectId(student["_id"]);
  student["_id"] = objID;
  studentCollection.update({ _id: objID }, student, { w: 1 }, (err, result) => {
    if (err) res.status(401).end();
    else res.status(200).end();
  });
});

router.delete("/delete/:id", (req, res, next) => {
  var studentId = req.params.id;
  console.log("Delete student" + studentId);
  var objID = new mongo.ObjectID(studentId);
  deleteStudentInAllSessions(studentId);
  studentCollection.deleteOne({ _id: objID });
  res.end();
});

deleteStudentInAllSessions = function(_studentId) {
  sessionCollection.find().toArray((err, items) => {
    if (!err) {
      for (let i = 0; i < items.length; i++) {
        console.log("Searching session student Ids");
        var session = items[i];
        var studentIds = session.students;
        const index = studentIds.indexOf(_studentId);
        if (index !== -1) {
          console.log("remove from session: ");
          console.log(session._id);
          studentIds.splice(index, 1);
          session.students = studentIds;
          sessionCollection.update({ _id: session._id }, session);
        }
      }
    }
  });
};

router.put("/add", (req, res, next) => {
  console.log("Add new student");
  var student = req.body;
  delete student["_id"];
  studentCollection.insert(student, { w: 1 }, (err, result) => {
    if (!err) res.status(200).end();
    else {
      res.status(401).end();
    }
  });
});

module.exports = router;
