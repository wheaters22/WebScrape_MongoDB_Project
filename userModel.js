/* Mongoose Example (Students) (18.3.03)
 * ===================================== */

// Dependency
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a userSchema object with the Schema class we just made
var UserSchema = new Schema({


  // boolean must be a boolean
  boolean: Boolean,

  // array must be an array
  array: Array,

   //1
   username: {
      type: String,
      trim: true,
      required: "username is Required"
   },
   //2
   password: {
      type: String,
      trim: true,
      required: "password is requred",
      validate: [
         function(input) {
            return input.length >= 6;
         },
         //Error Message
         "Password should be longer"
      ]
   },
   //3
  //  email: {
  //     type: String,
  //     unique: true,
  //     match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  // },
   //4
   userCreated: {
      type: Date,
      default: Date.now
  }
});

// Create the "User" model with our UserSchema schema
var User = mongoose.model("User", UserSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = User;