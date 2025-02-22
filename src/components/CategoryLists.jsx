import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const CategoryLists = () => {
  const [lists, setLists] = useState([]);
  const [toDos, setTodos] = useState([]);
  const [inProgresses, setInProgresses] = useState([]);
  const [dones, setDones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((res) => {
        setLists(res);
        setTodos(res?.filter((list) => list.category === "To-Do") || []);
        setInProgresses(
          res?.filter((list) => list.category === "In Progress") || []
        );
        setDones(res?.filter((list) => list.category === "Done") || []);
      });
  }, []);



  return (
    <div className="grid lg:grid-cols-3 gap-4 p-5">
      {/* To-Do */}
      <div
        className="bg-gray-100 p-4 rounded"
      >
        <div className="flex gap-2 justify-center">
        <h2 className="text-lg font-bold mb-2 text-center">To-Do</h2>
        <p className="border rounded-full w-7 h-7 text-center bg-gray-600 text-white">{toDos.length}</p>
        </div>
        {toDos.map((task) => (
          <div
            key={task._id}
            className=" flex justify-between gap-10 p-5 mb-2 bg-white shadow-md hover:shadow-xl rounded cursor-grabbing"
          >
            <div>
            <h1 className="font-semibold text-xl">{task.title}</h1>
            <p className="py-2 text-sm">{task.description}</p>
            </div>
            <button><MdDelete className="text-red-600" size={25} /></button>
          </div>
        ))}
      </div>

      {/* In-Progress */}
      <div
        className="bg-yellow-100 p-4 rounded"
      >
        <div className="flex gap-2 justify-center">
        <h2 className="text-lg font-bold mb-2 text-center">In-Progress</h2>
        <p className="border rounded-full w-7 h-7 text-center bg-yellow-300">{inProgresses.length}</p>
        </div>
        {inProgresses.map((task) => (
          <div
            key={task._id}
            className="flex justify-between gap-10 p-5 mb-2 bg-white shadow-md hover:shadow-xl rounded cursor-grabbing"
          >
           <div>
           <h1 className="font-semibold text-xl">{task.title}</h1>
           <p className="py-2 text-sm">{task.description}</p>
           </div>
            <button><MdDelete className="text-red-600" size={25} /></button>
          </div>
        ))}
      </div>

      {/* Done*/}
      <div
        className="bg-green-100 p-4 rounded"
      >
         <div className="flex gap-2 justify-center">
        <h2 className="text-lg font-bold mb-2 text-center">Done</h2>
        <p className="border rounded-full w-7 h-7 text-center text-white bg-blue-500">{dones.length}</p>
        </div>
        {dones.map((task) => (
          <div
            key={task._id}
            className="p-5 flex justify-between gap-10 mb-2 bg-white shadow-md hover:shadow-xl rounded cursor-grabbing"
          >
            <div>
            <h1 className="font-semibold text-xl">{task.title}</h1>
            <p className="py-2 text-sm">{task.description}</p>
            </div>
            <button><MdDelete className="text-red-600" size={25} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLists;
