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

// Var for database
var database = firebase.database();

// Using jQuery to call the button to search for a train
$("#add-train-btn").on("click", function (event) {
    // Add event.preventDefault() to prevent the form from trying to submit itself
    event.preventDefault();

    // Variables created to grab what the user inputs
    var train = $("train-input").val().trim();
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
