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

//rendering the page
app.get("/", async function (req, res) {
  var tasks = await Task.find({});
  return res.render("home", { title: "Todo Home Page", task: tasks });
});

//creating the task
app.post("/create-task", async function (req, res) {
  await Task.create({
    description: req.body.description,
    category: req.body.category,
    dueDate: req.body.dueDate,
  });
  return res.redirect("back");
});

// make the app to listen on asigned port number
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
  }
  console.log("yup!My express server is running");
});
