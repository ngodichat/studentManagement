var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var students;

/**
 * Add firebase configuration
 */
// const firebase = require("firebase");
// var config = {
//   apiKey: "AIzaSyDewV3yFu0J-lq0gt86wTSqeEoiRvw9dcM",
//   authDomain: "studentmanagement-1fc5a.firebaseapp.com",
//   databaseURL: "https://studentmanagement-1fc5a.firebaseio.com",
//   storageBucket: "studentmanagement-1fc5a.appspot.com"
// };
// firebase.initializeApp(config);

// const dataRef = firebase.database().ref().child('object');
// dataRef.on('value', snap =>{
//     console.log(snap.val())
// });

/* GET users listing. */
const dataLink = "src/assets/data.json";
fs.readFile(dataLink,'utf8',(err, data)=>{
    if(err) throw err;
    students = JSON.parse(data);
    // console.log(students["studentsList"]);
});

router.get('/', function(req, res, next) {
//   res.send('this is students js');
    res.send(students["studentsList"]);
});


module.exports = router;
