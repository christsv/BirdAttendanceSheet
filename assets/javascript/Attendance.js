$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBT5NvjIQ9bPb-xjBntg5aOG187nhef2yM",
    authDomain: "bird-attendance-sheet.firebaseapp.com",
    databaseURL: "https://bird-attendance-sheet.firebaseio.com",
    projectId: "bird-attendance-sheet",
    storageBucket: "bird-attendance-sheet.appspot.com",
    messagingSenderId: "993017711625"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  
  $("#submit-btn").on("click", function(event){

      event.preventDefault();

      //Grab all values
      var todayDate = $("#date").val().trim();
      var ScooterID = $("#scooter-id").val().trim().toUpperCase();
      var Tech = $("#tech-name").children("option:selected").text();
  
      var Issue = $("#issue").children("option:selected").text();
      var Time = $("#time-fixed").val();
      alert("clicked");
      //put all info into an object so we can push this to the data base  
      var newArray = {
        date: todayDate,
        ID: ScooterID,
        tech: Tech,
        issue: Issue,
        time: Time
      };

      //uploads the data into the firebase database
      database.ref().push(newArray);

    // Logs to console
    console.log(newArray.date);
    console.log(newArray.ID);
    console.log(newArray.tech);
    console.log(newArray.issue);
    console.log(newArray.time);

    alert("Success!!");
    
    $("#date").val("");
    $("#scooter-id").val("");
    $("#time-fixed").val("");
  });

  // when a child (folder) is added to the database
database.ref().on("child_added", function(snapshot){
    
    //returns exactly what is displayed in the firebase console
    console.log(snapshot.val());

    //We upload to html here so that it saves to database and upload. if we do it on the submit click it will only
    //stay database and disappear from html when refreshed
    var date = snapshot.val().date;
    var id = snapshot.val().ID;
    var tech = snapshot.val().tech;
    var issue = snapshot.val().issue;
    var time = snapshot.val().time;

    var newRow = $("<tr>").append(
        $("<td>").text(date),
        $("<td>").text(id),
        $("<td>").text(tech),
        $("<td>").text(issue),
        $("<td>").text(time)
    );

    $("#scooter-body").append(newRow);
});

});