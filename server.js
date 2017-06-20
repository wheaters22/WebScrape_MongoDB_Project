// code initially pulled from 18.2 ACT 6(solved, server2.js)

// Dependencies:


// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Here's where we establish a connection to the collection
// We bring the model in like any old module
// Most of the magic with mongoose happens there
//
// Example gets saved as a class, so we can create new Example objects
// and send them as validated, formatted data to our mongoDB collection.
var Example = require("./userModel.js");
// try ("userModel.js");


// Initialize Express
var app = express();

// Configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Static file support with public folder
app.use(express.static("public"));


// Database configuration for mongoose
// db: techwebDB
mongoose.connect("mongodb://localhost/techwebDB");
// Hook mongoose connection to db
var db = mongoose.connection;

// Log any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// ======

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {

  // We use the "Example" class we defined above to check our req.body against our user model
  var user = new Example(req.body);

  // With the new "Example" object created, we can save our data to mongoose
  // Notice the different syntax. The magic happens in userModel.js
  user.save(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Otherwise, send the new doc to the browser
    else {
      res.send(doc);
    }
  });
});












// Snatches HTML from URLs
var request = require("request");
// Scrapes our HTML
var cheerio = require("cheerio");


// First, tell the console what server.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the TechCrunch website:" +
            "\n******************************************\n");


// Making a request call for nhl.com's homepage
request("https://www.techcrunch.com/", function(error, response, html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);

  // Empty array to save our scraped data
  var result = [];

  // With cheerio, find each h2-tag with the class "post-title"
  // $("h4.headline-link").each(function(i, element) {
  $("h2.post-title").each(function(i, element) {

    // Save the text of the h2-tag as "title"
    var title = $(this).text();

    // Find the h2 tag's parent a-tag, and save it's href value as "link"
    var link = $(element).parent().attr("href");

    //CREATE ADDITIONAL VARIABLES FOR byline, img, etc.

    // For each h2-tag, make an object with data we scraped and push it to the result array
    result.push({
      title: title,
      link: link
    });

  });

  // After the program scans each h4.headline-link, log the result
  console.log(result);
});



// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});