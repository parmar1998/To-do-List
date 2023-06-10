// require express for setting up the express server
const express = require("express");
//setup port number
const port = 8080;
// importing the DataBase
const db = require("./config/mongoose");
// using express
const app = express();
//importing the schema for tasks
const Task = require("./models/task.js");
//for using the static file
app.use(express.static("./views"));
//to use encrypted data
app.use(express.urlencoded());
//setup view engine for ejs file
app.set("view engine", "ejs");
app.set("views", "./views");

//rendering the page
app.get("/", async function (req, res) {
  var tasks = await Task.find({});
  return res.render("home", { title: "Todo Home Page", task: tasks });
});

//creating the task
app.post("/create-task", async function (req, res) {
  try {
    await Task.create({
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    });
    return res.redirect("back");
  } catch (error) {
    // Handle the error
    console.error(error);
    return res.status(500).send("An error occurred");
  }
});

//delete task
app.get("/delete-task", async function (req, res) {
  try {
    // Get the id from query
    var id = req.query;
    // Checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    // Create an array to store promises for task deletion
    var deletePromises = [];
    for (let i = 0; i < count; i++) {
      // Finding and deleting tasks from the DB one by one using id
      const deletePromise = Task.findByIdAndDelete(Object.keys(id)[i]);
      deletePromises.push(deletePromise);
      // Wait for all delete promises to resolve
      await Promise.all(deletePromises);
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send("An error occured");
  }});

// make the app to listen on asigned port number
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
  }
  console.log("yup!My express server is running");
});
