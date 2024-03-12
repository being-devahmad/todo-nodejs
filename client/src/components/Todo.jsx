import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Todo = () => {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);

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
                alert("Todo successfully added")
                setTitle('');
            } else {
                console.error('Error creating todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <>
            <div className='flex justify-center bg-slate-200 font-mono'>
                <div className='w-[70%] my-16'>
                    <p className='text-3xl text-center font-bold '>Todo List App</p>


                    <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-5 p-4">
                            <input type="text" class="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5 "
                                placeholder="Add some text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required />
                        </div>
                        <div className='flex justify-center'>
                            <button type="submit" class="text-white bg-gray-800 hover:bg-gray-700 text-lg rounded-lg w-full sm:w-auto px-10 py-2.5 text-center">Add</button>
                        </div>
                    </form>
                    <div className='mt-10'>
                        {
                            todos.map((todo) => {
                                return (
                                    <>
                                        <div className='max-w-sm mx-auto mt-3 bg-gray-700 text-white p-4 flex justify-between rounded-2xl shadow-md' key={todo._id}>
                                            <p>{todo.title}</p>
                                            <div className='flex gap-2 text-2xl'>
                                                <FaRegEdit className='cursor-pointer' />
                                                <MdDelete className='cursor-pointer' />
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                        <div className='flex justify-center'>
                            <button type="submit" class="text-white bg-gray-800 hover:bg-gray-700 text-lg rounded-lg w-full mt-3 sm:w-auto px-10 py-2.5 text-center">Delete All</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;
