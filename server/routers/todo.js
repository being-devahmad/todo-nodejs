const express = require('express');
const router = express.Router()
const todoController = require("../controllers/todo")

router.route('/')
    .post(todoController.createTodo)
    .get(todoController.getAllTodos)
    .delete(todoController.deleteAllTodos)


router.route('/:id')
    .delete(todoController.deleteTodo)
    .put(todoController.updateTodo);

    module.exports = router