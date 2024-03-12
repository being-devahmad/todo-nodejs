const Todo = require("../models/todo")

// create a todo 
const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const todo = new Todo({ title })
        await todo.save()
        console.log(todo)
        res.status(200).send(todo)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).send(todos)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const { title } = req.body
        const todo = await Todo.findByIdAndUpdate(req.params.id, { title })
        if (!todo) {
            res.status(404).json({ message: "Todo not found" })
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if (!todo) {
            res.status(404).json({ message: "Todo not found" })
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { createTodo, getAllTodos, updateTodo, deleteTodo }