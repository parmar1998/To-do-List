const mongoose = require("mongoose");

const taskScehma = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Task', taskScehma);
module.exports = Task;
