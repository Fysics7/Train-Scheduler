$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyABixMf9Zm9Yq_nVDsfpA_BKndZzQJhnxY",
    authDomain: "test-3482c.firebaseapp.com",
    databaseURL: "https://test-3482c.firebaseio.com",
    projectId: "test-3482c",
    storageBucket: "test-3482c.appspot.com",
    messagingSenderId: "1051426016690"
  };
    firebase.initializeApp(config);
    var database = firebase.database();

    // Button 
    $("#addTrain").on("click", function () {
    event.preventDefault();

    // Get values from text fields
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#interval").val().trim();

    // Sending data to database
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: freq
        });
            
    });

    database.ref().on("child_added", function (childSnapshot) {
        
        var nextArr;
        var minAway;
        // Chang year so first train comes before now
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#all-display").append("<tr><td>" + childSnapshot.val().trainName +
                "</td><td>" + childSnapshot.val().destination +
                "</td><td>" + childSnapshot.val().frequency +
                "</td><td>" + nextTrain + 
                "</td><td>" + minAway + "</td></tr>");
            
            // Clear input fields
            $("#trainName, #destination, #firstTrain, #interval").val("");
            
        },
        //Handle the errors
        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
        
        
        
        
    }); 
        
        

