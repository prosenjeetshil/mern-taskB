const express = require("express");

const todoModel = require("../models/todoModel");

// create todo
const createTodoController = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Title and Description are required",
      });
    }
    const newTodo = new todoModel({
      title,
      description,
      createdBy: req.user.id,
    });
    const result = await newTodo.save();
    res.status(201).send({
      success: true,
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating todo",
      error,
    });
  }
};

// get all todos
const getAllTodosController = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await todoModel.find({ createdBy: userId });

    res.status(200).send({
      success: true,
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting todos",
      error,
    });
  }
};


// update todo
const updateTodoController = async (req, res) => {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      return res.status(404).send({
        success: false,
        message: "Todo ID is required",
      });
    }
    const data = req.body;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      { _id: todoId },
      { $set: data },
      { returnOriginal: false }
    );
    if (!updatedTodo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating todo",
      error,
    });
  }
};

// delete todo
const deleteTodoController = async (req, res) => {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      return res.status(404).send({
        success: false,
        message: "Todo ID is required",
      });
    }

    // find todo by id and delete
    const todo = await todoModel.findByIdAndDelete({ _id: todoId });
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting todo",
      error,
    });
  }
};

module.exports = {
  createTodoController,
  getAllTodosController,
  updateTodoController,
  deleteTodoController,
};
