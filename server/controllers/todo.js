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
        // console.log('all todos', todos)
        res.status(200).send(todos)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(id, { title });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo with ID not found" });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo with ID not found" });
        }
        res.status(200).json({ message: "Todo successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAllTodos = async (req, res) => {
    try {
        await Todo.deleteMany({});
        res.status(200).json({ message: "All todos successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { createTodo, getAllTodos, updateTodo, deleteTodo, deleteAllTodos }