const app = require("express");
const router = app.Router();
const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
var sessions;

var db;

var sessionCollection = null;
var studentCollection = null;

MongoClient.connect(
  "mongodb://test:123456@ds163340.mlab.com:63340/heroku_59pxw6v8",
  (err, database) => {
    if (!err) {
      console.log("DB Connected");
      var currentDB = database.db("heroku_59pxw6v8");
      db = currentDB;
      sessionCollection = db.collection("sessions");
      studentCollection = db.collection("students");
      //   var collection = this.db.collection("students");
      //   collection.find().toArray((err, items) => {
      //     console.log(items);
      //   });
    } else {
      console.log("Can't connect to Mongo DB");
    }
  }
);

router.get("/", (req, res) => {
  console.log("Get all sessions request");
  sessionCollection.find().toArray((err, items) => {
    if (!err) {
      res.status(200).json(items);
      // console.log(items);
    }
  });
});

// get all students of a session
router.get("/students/:id", (req, res) => {
  var id = req.params.id;
  var objID = new mongo.ObjectID(id);
  console.log(`Get all students of session: ${id} request`);
  sessionCollection.find({ _id: objID }).toArray((err, items) => {
    if (!err) {
      for (let i = 0; i < items.length; i++) {
        const studentIDs = items[i].students;
        if(studentIDs){
          var ids = new Array();
          for (let j = 0; j < studentIDs.length; j++) {
            const studentID = new mongo.ObjectId(studentIDs[j]);
            ids.push(studentID);
          }
          studentCollection.find({ _id: { $in: ids} }).toArray((err, data) => {
            res.send(data);
          });
        }
        else {
          res.send(new Array());
        }
      }
    }
  });
});

router.post("/", (req, res) => {
  console.log("Get add new session request");
  // var sessionCollection = db.collection("sessions");
  sessionCollection.save(req.body);
  res.end();
});

router.put("/", (req, res) => {
  console.log("Get update session request");
  var session = req.body;
  var objectID = new mongo.ObjectID(session._id);
  session._id = objectID;
  sessionCollection.update(
    { _id: objectID },
    session,
    { w: 1 },
    (err, result) => {
      if (err) {
        res.status(401).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  console.log(`Get delete session request: sessionID: ${req.params.id}`);
  var objID = new mongo.ObjectID(req.params.id);
  sessionCollection.deleteOne({ _id: objID });
});

module.exports = router;
