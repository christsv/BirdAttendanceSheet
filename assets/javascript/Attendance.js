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
  var ref = database.ref();
  //var ref = database.ref("-LdI1pVJP4Orb7_cxi3k");

  var total = 0;
  var array = {
    Chris_Valenzuela: 0,
    Kent_Hayes: 0,
    Sharon_Oun: 0,
    Soun_Oeng: 0,
    Aaron_Candela: 0,
    Anthony_Soberanis: 0
};


$("#employee-btn").on("click", function(event){
    event.preventDefault();
  
    ref.on('value', function(snapshot) {

        var value = snapshot.val();
        var keys = Object.keys(value);
        for(var i = 0; i <keys.length; i++) {
  
          var copy = value[keys[i]].tech;
          var newCopy = copy.split(" ");
          var newerCopy = newCopy.join("_");
  
          for(var name in array) {
              if(name == newerCopy){
                  array[name] = array[name] + 1; 
              }
          }
          total+=1;
      }
    });
    
    for (var name in array) {
        array[name] = array[name]/total;
    }
    alert("Winner: Chris Valenzuela (indefinetly)");
    console.log(array);
    
    drawChart(array);


        
    

})

// Grabbed online cause Tired

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
var drawChart = function(array) {
  var data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Chris Valenzuela', array.Chris_Valenzuela],
  ['Kent Hayes', array.Kent_Hayes],
  ['Aaron Candela', array.Aaron_Candela],
  ['Sharon Oun', array.Sharon_Oun],
  ['Soun Oeng', array.Soun_Oeng],
  ['Anthony Soberanis', array.Anthony_Soberanis]
]);

var options = {'title': "Scooters Fixed", 'width':600, 'height':600};
var chart = new google.visualization.PieChart(document.getElementById('calculated-body'));
chart.draw(data,options);
}


//Object.keys() returns an array of a given object's property names in the same order
// basically if u have an object itll return it to an array with each item being the name of each item in the object



  
  $("#submit-btn").on("click", function(event){

      event.preventDefault();

      //Grab all values
      var todayDate = $("#date").val().trim();
      var ScooterID = $("#scooter-id").val().trim().toUpperCase();
      var Tech = $("#tech-name").children("option:selected").text();
      var Issue = $("#issue").children("option:selected").text();
      var Time = $("#time-fixed").val();
 
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
   /* console.log(newArray.date);
    console.log(newArray.ID);
    console.log(newArray.tech);
    console.log(newArray.issue);
    console.log(newArray.time);
*/
    alert("Success!!");
    
    $("#date").val("");
    $("#scooter-id").val("");
    $("#time-fixed").val("");
      }
  );

  // when a child (folder) is added to the database
database.ref().on("child_added", function(snapshot){
    
    //returns exactly what is displayed in the firebase console
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

