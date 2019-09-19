$(document).ready(function(){
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCI9UahpDxMfav_-lRpiKYn-DanOAthVSM",
    authDomain: "train-scheduler-c2218.firebaseapp.com",
    databaseURL: "https://train-scheduler-c2218.firebaseio.com",
    projectId: "train-scheduler-c2218",
    storageBucket: "",
    messagingSenderId: "908145049588",
    appId: "1:908145049588:web:1f487eeda8667d0af2c3a1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//Get a Reference to the Database Service
var database = firebase.database();
//Global Variables
var trainName;
var trainDestination;
var trainFrequency;
var firstTrain;
var trainNextArrival;
var trainMinutesAway;
//first 4 in the data base

//make and on click event to capture the data on my form
$("#add-train").on("click",function(event){
    event.preventDefault();

    trainName= $("#formGroupExampleInput") .val().trim();
    trainDestination= $("#formGroupExampleInput2").val().trim();
    firstTrain= $("#formGroupExampleInput3").val().trim();
    trainFrequency= $("#formGroupExampleInput4").val().trim();
    
//checking my work
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(firstTrain);
//
    database.ref().push({
        dbtrainName: trainName,
        dbtrainDestination: trainDestination,
        dbinFrequency: trainFrequency,
        dbfirstTrain: firstTrain,


    })

//alerting when a train is added on the submit
alert("New Train has been added!");

//clearing my fills
$("#formGroupExampleInput") .val("");
$("#formGroupExampleInput2").val("");
$("#formGroupExampleInput3").val("");
$("#formGroupExampleInput4").val("");
});

database.ref().on("child_added",function(snapshot){
//console.log my data to make sure it is getting results
console.log(snapshot.val());

var tName = snapshot.val().dbtrainName;
var tDestination = snapshot.val().dbtrainDestination;
var tFrequency = snapshot.val().dbinFrequency;
var tFirstTrain = snapshot.val().dbfirstTrain;



//Next arrival time and Minures away with Calculation
     var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
     var tRemainder = diffTime % tFrequency;
     console.log(tRemainder);

    // // Minute Until Train
     var tMinutesTillTrain = tFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

     // To calculate the arrival time, add the tMinutestillTrain to the currrent time
    var tArrival = moment().add(tMinutesTillTrain, "m").format("hh:mm A");
     
//making the table
var tr = $("<tr>")
//displays what is inside table
tr.append("<td>"+ tName + "</td>"),
tr.append("<td>"+ tDestination + "</td>"),
tr.append("<td>"+ tFrequency + "</td>"),
tr.append("<td>"+ tArrival + "</td>"),
tr.append("<td>" + tMinutesTillTrain + " " + "minutes" +"</td>"),
$("tbody").append(tr)
});


})

