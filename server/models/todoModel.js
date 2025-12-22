const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      maxLength: 180,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdBy: {
        ref: 'users',
        type: mongoose.Schema.ObjectId,
    }
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todos", todoSchema);

module.exports = todoModel;
