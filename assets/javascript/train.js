// entering in custom firebaseConfig where data is stored

var firebaseConfig = {
    apiKey: "AIzaSyBO90jY6oosYEwHSAkHlCqIh3JftA3okNA",
    authDomain: "train-scheduler-1e628.firebaseapp.com",
    databaseURL: "https://train-scheduler-1e628.firebaseio.com",
    projectId: "train-scheduler-1e628",
    storageBucket: "train-scheduler-1e628.appspot.com",
    messagingSenderId: "249550498809",
    appId: "1:249550498809:web:13325855828c784d842b28"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebaseConfig);

// Var for database
var database = firebase.database();

// Using jQuery to call the button to search for a train
$("#add-train-btn").on("click", function (event) {
    // Add event.preventDefault() to prevent the form from trying to submit itself
    event.preventDefault();

    // Variables created to grab what the user inputs
    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency-input").val().trim();

    // Creation of area for holding all the train data
    var newTrain = {
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };
    console.log(newTrain);
    // Uploads the train data to the database
    database.ref().push(newTrain);


    // Per class, we should be logging everything to console to check our work
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // Once submitted, clear the form data
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// Per class - this creates a Firebase event for adding a train to the database
// This also creates a row in the html when a user does their train search
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // These lines store everything in a variable
    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // Logging data again to ensure that the code is functioning as expected
    console.log(train);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // Need to add in time elements using moment js
    var hours = firstTrain.split(":")[0];
    var minutes = firstTrain.split(":")[1];
    var trainTime = moment().hours(hours).minutes(minutes);
    var trainMin = moment().diff(trainTime, "minutes");
    var minutesAway = Math.abs(trainMin % frequency);
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    console.log(minutesAway);
    console.log(nextArrival);

    // Create the new rows in table
    var newRow = $("<tr>").append(
        $("<td>").text(train),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});
