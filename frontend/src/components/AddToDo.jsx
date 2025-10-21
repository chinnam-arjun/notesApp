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
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 ">
    //   <div className="flex flex-col gap-8 w-full max-w-3xl ">
    //     {/* Add Todo Card */}
    //     <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300">
    //       <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center tracking-wide">
    //         Add ToDo
    //       </h2>

    //       <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4">
    //         <input
    //           type="text"
    //           placeholder="Enter your task..."
    //           value={task}
    //           onChange={(e) => setTask(e.target.value)}
    //           className="flex-1 p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
    //         />
    //         <button
    //           type="submit"
    //           className="px-6 py-3 bg-indigo-600 rounded-xl font-semibold text-white hover:bg-indigo-700 shadow-md transition duration-300"
    //         >
    //           Add
    //         </button>
    //       </form>
    //     </div>

    //     {/* Todo List */}
    //     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
    //       <h3 className="text-2xl font-semibold mb-6 text-indigo-700 tracking-wide">
    //         Your Tasks
    //       </h3>

    //       {todos.length === 0 ? (
    //         <p className="text-gray-400 text-center">No tasks yet. Add one above 👆</p>
    //       ) : (
    //         <div className="overflow-x-auto">
    //           <table className="w-full text-left border-collapse">
    //             <thead className="bg-indigo-100 rounded-xl">
    //               <tr className="text-gray-700">
    //                 <th className="py-3 px-4">#</th>
    //                 <th className="py-3 px-4">Task</th>
    //                 <th className="py-3 px-4">Created At</th>
    //                 <th className="py-3 px-4">Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {todos.map((todo, index) => (
    //                 <tr
    //                   key={todo.id}
    //                   className="border-b border-gray-200 hover:bg-indigo-50 transition"
    //                 >
    //                   <td className="py-2 px-4 font-medium">{index + 1}</td>
    //                   <td className="py-2 px-4">
    //                     {editId === todo.id ? (
    //                       <input
    //                         type="text"
    //                         value={editTask}
    //                         onChange={(e) => setEditTask(e.target.value)}
    //                         className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
    //                       />
    //                     ) : (
    //                       todo.task
    //                     )}
    //                   </td>
    //                   <td className="py-2 px-4 text-sm text-gray-500">{todo.createdAt}</td>
    //                   <td className="py-2 px-4 flex gap-2">
    //                     {editId === todo.id ? (
    //                       <button
    //                         onClick={() => handleUpdate(todo.id)}
    //                         className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600 text-white transition"
    //                       >
    //                         Save
    //                       </button>
    //                     ) : (
    //                       <button
    //                         onClick={() => handleEdit(todo.id, todo.task)}
    //                         className="px-3 py-1 bg-yellow-400 rounded-lg hover:bg-yellow-500 text-white transition"
    //                       >
    //                         Edit
    //                       </button>
    //                     )}
    //                     <button
    //                       onClick={() => handleDelete(todo.id)}
    //                       className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 text-white transition"
    //                     >
    //                       Delete
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
    //   <div className="flex flex-col w-full max-w-3xl gap-4 h-[90vh]">
    //     <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300 sticky top-0 z-10">
    //       <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center tracking-wide">
    //         Add ToDo
    //       </h2>
    //       <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4">
    //         <input
    //           type="text"
    //           placeholder="Enter your task..."
    //           value={task}
    //           onChange={(e) => setTask(e.target.value)}
    //           className="flex-1 p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
    //         />
    //         <button
    //           type="submit"
    //           className="px-6 py-3 bg-indigo-600 rounded-xl font-semibold text-white hover:bg-indigo-700 shadow-md transition duration-300"
    //         >
    //           Add
    //         </button>
    //       </form>
    //     </div>

    //     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 overflow-y-auto flex-1">
    //       <h3 className="text-2xl font-semibold mb-6 text-indigo-700 tracking-wide ">
    //         Your Tasks
    //       </h3>

    //       {todos.length === 0 ? (
    //         <p className="text-gray-400 text-center">No tasks yet. Add one above 👆</p>
    //       ) : (
    //         <div className="space-y-3">
    //           {todos.map((todo, index) => (
    //             <div
    //               key={todo.id}
    //               className="p-4 bg-indigo-50 rounded-xl flex justify-between items-center shadow hover:shadow-md transition"
    //             >
    //               <div className="flex-1">
    //                 {editId === todo.id ? (
    //                   <input
    //                     type="text"
    //                     value={editTask}
    //                     onChange={(e) => setEditTask(e.target.value)}
    //                     className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
    //                   />
    //                 ) : (
    //                   <span className="text-gray-800 font-medium">{todo.task}</span>
    //                 )}
    //                 <div className="text-xs text-gray-500 mt-1">{todo.createdAt}</div>
    //               </div>
    //               <div className="flex gap-2 ml-4">
    //                 {editId === todo.id ? (
    //                   <button
    //                     onClick={() => handleUpdate(todo.id)}
    //                     className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600 text-white transition"
    //                   >
    //                     Save
    //                   </button>
    //                 ) : (
    //                   <button
    //                     onClick={() => handleEdit(todo.id, todo.task)}
    //                     className="px-3 py-1 bg-yellow-400 rounded-lg hover:bg-yellow-500 text-white transition"
    //                   >
    //                     Edit
    //                   </button>
    //                 )}
    //                 <button
    //                   onClick={() => handleDelete(todo.id)}
    //                   className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 text-white transition"
    //                 >
    //                   Delete
    //                 </button>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
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
