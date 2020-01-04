// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//please work
let resList = [];
let waitList = [];

let counter = 0;
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "public/tables.html"));
});

app.get("/reservation", function(req, res) {
  console.log("Navigating to" + (path.join(__dirname, "public/reservation.html")));
  res.sendFile(path.join(__dirname, "public/reservation.html"));

});

// Displays all characters
app.get("/api/reservations", function(req, res) {
  return res.json(resList);
});

// Displays all characters
app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});

// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newRes = req.body;

  // console.log(newRes);
newRes.uniqueId = newRes.name.replace(/\s+/g, '') + counter;
counter++;
  resList.push(newRes);

  res.json(newRes);
});

// Displays a single character, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < resList.length; i++) {
    if (chosen === resList[i].uniqueId) {
      return res.json(resList[i]);
    }
  }

  return res.json(false);
});

// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
