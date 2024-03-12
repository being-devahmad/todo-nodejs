const express = require('express');
const router = express.Router()
const todoController = require("../controllers/todo")

router.route('/')
    .post(todoController.createTodo)
    .get(todoController.getAllTodos)
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo)

module.exports = router