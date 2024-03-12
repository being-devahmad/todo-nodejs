import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { CiSaveDown1 } from "react-icons/ci";
import Swal from 'sweetalert2'

const Todo = () => {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/todo`);
            if (response.ok) {
                const todosData = await response.json();
                setTodos(todosData);
            } else {
                console.error('Failed to fetch todos:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/todo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            });

            if (response.ok) {
                await fetchTodos();
                // alert("Todo successfully added")
                Swal.fire({
                    title: 'Success!',
                    text: 'Todo Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setTitle('');
            } else {
                console.error('Error creating todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                await fetchTodos();
                // alert("Todo successfully deleted");
                Swal.fire({
                    title: 'Success!',
                    text: 'Deleted Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } else {
                const errorData = await response.json();
                if (errorData.message) {
                    alert(errorData.message);
                } else {
                    console.log('Error deleting todo:', response.statusText);
                }
            }
        } catch (error) {
            console.log('Error deleting todo:', error);
        }
    };

    const handleDeleteAll = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/todo`, {
                method: "DELETE"
            });
            if (response.ok) {
                await fetchTodos();
                setTodos([])
                // alert("All todos successfully deleted");
                Swal.fire({
                    title: 'Success!',
                    text: 'All Todos Deleted Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } else {
                const errorData = await response.json();
                if (errorData.message) {
                    alert(errorData.message);
                } else {
                    console.log('Error deleting todos:', response.statusText);
                }
            }
        } catch (error) {
            console.log('Error deleting todos:', error);
        }
    };

    const handleEdit = (id, currentTitle) => {
        setEditingTodoId(id);
        setUpdatedTitle(currentTitle);
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: updatedTitle }),
            });

            if (response.ok) {
                await fetchTodos();
                alert("Todo successfully updated");
                setEditingTodoId(null);
            } else {
                console.error('Error updating todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <>
            <div className='flex justify-center bg-slate-200 font-mono'>
                <div className='w-[70%] my-16'>
                    <p className='text-3xl text-center font-bold '>Todo List App</p>

                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-5 p-4">
                            <input
                                type="text"
                                className="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5"
                                placeholder="Add some text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="submit"
                                className="text-white bg-gray-800 hover:bg-gray-700 text-lg rounded-lg w-full sm:w-auto px-10 py-2.5 text-center"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                    <div className='mt-10'>
                        {
                            todos.map((todo) => {
                                return (
                                    <div className='max-w-sm mx-auto mt-3 bg-gray-700 text-white p-4 flex justify-between rounded-2xl shadow-md' key={todo._id}>
                                        {
                                            editingTodoId === todo._id ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 mr-5'
                                                        value={updatedTitle}
                                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                                    />
                                                    <div className='flex items-center'>
                                                        <CiSaveDown1
                                                            className='cursor-pointer text-2xl'
                                                            onClick={() => handleUpdate(todo._id)}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p>{todo.title}</p>
                                                    <div className='flex gap-2 text-2xl'>
                                                        <MdEdit
                                                            className='cursor-pointer'
                                                            onClick={() => handleEdit(todo._id, todo.title)}
                                                        />
                                                        <MdDelete
                                                            className='cursor-pointer'
                                                            onClick={() => handleDelete(todo._id)}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                );
                            })
                        }

                        <div className='flex justify-center'>
                            <button
                                type="button"
                                className="text-white bg-gray-800 hover:bg-gray-700 text-lg rounded-lg w-full mt-3 sm:w-auto px-10 py-2.5 text-center"
                                onClick={handleDeleteAll}
                            >
                                Delete All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;
