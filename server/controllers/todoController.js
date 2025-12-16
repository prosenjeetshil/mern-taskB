const express = require("express");

const todoModel = require("../models/todoModel");

const createTodoController = async (req, res) => {
    res.send("Create todo route");
}

module.exports = { createTodoController };