import React, { use, useEffect, useState } from "react";

const AddToDo = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user?.id || user?.email;

  const [todos, setTodos] =useState(() => {
    const saved = localStorage.getItem(`todos-${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");
  useEffect(() => {
  if (userId) {
    localStorage.setItem(`todos-${userId}`, JSON.stringify(todos));
  }
}, [todos, userId]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newTodo = {
      id: Date.now(),
      task,
      createdAt: new Date().toLocaleString(),
    };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, currentTask) => {
    setEditId(id);
    setEditTask(currentTask);
  };

  const handleUpdate = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: editTask } : todo
      )
    );
    setEditId(null);
    setEditTask("");
  };

  return (
 
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto gap-4">
  {/* Add Task Form */}
  <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
    <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
      Add ToDo
    </h2>
    <form onSubmit={handleAdd} className="flex gap-3">
      <input
        type="text"
        placeholder="Enter your task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </form>
  </div>
  <h3 className="text-2xl font-semibold text-indigo-700 tracking-wide bg-white z-10">
      Your Tasks
    </h3>

  {/* Tasks List - Only this scrolls */}
  <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 flex-1 overflow-y-auto">
    

    {todos.length === 0 ? (
      <p className="text-gray-400 text-center">No tasks yet. Add one above 👆</p>
    ) : (
      <div className="space-y-3">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className="p-4 bg-indigo-50 rounded-xl flex justify-between items-center shadow hover:shadow-md transition"
          >
            <div className="flex-1">
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              ) : (
                <span className="text-gray-800 font-medium">{todo.task}</span>
              )}
              <div className="text-xs text-gray-500 mt-1">{todo.createdAt}</div>
            </div>
            <div className="flex gap-2 ml-4">
              {editId === todo.id ? (
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600 text-white transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.task)}
                  className="px-3 py-1 bg-yellow-400 rounded-lg hover:bg-yellow-500 text-white transition"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(todo.id)}
                className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

 
  );
};

export default AddToDo;
