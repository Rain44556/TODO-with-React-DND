import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdDelete, MdEvStation } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';


const CategoryLists = () => {
  const [lists, setLists] = useState([]);
  const [toDos, setTodos] = useState([]);
  const [inProgresses, setInProgresses] = useState([]);
  const [dones, setDones] = useState([]);
  const [deleteTasks, setDeleteTasks] = useState(lists);

const fetchTask = ()=>{
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
}


  useEffect(() => {
    fetchTask();
  }, []);

  const [{ isOver: isOverTodo }, todoDrop] = useDrop(() => ({
    accept: "task",
    drop: item =>handleUpdateCategory(item.id, "To-Do"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))


  const [{ isOver: isOverProgress }, inProgressesDrop] = useDrop(() => ({
    accept: "task",
    drop: item =>handleUpdateCategory(item.id, "In Progress"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const [{ isOver: isOverDone }, doneDrop] = useDrop(() => ({
    accept: "task",
    drop: item =>handleUpdateCategory(item.id, "Done"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  //delete
  const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Successfully deleted.",
                            icon: "success"
                        });
                        navigate("/addTask");
                        const remaining = deleteTasks.filter(task => task._id !== id);
                        setDeleteTasks(remaining);
                    }
                })
        }
    })
}


//update
  const handleUpdateCategory = (id, category) =>{
fetch(`http://localhost:5000/tasks/${id}`,
    {
    method: "PATCH",
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
    category
    })
    })
    .then(res =>{
return res.json()})
.then(data => {
        toast.success("Updated Successfully")
        fetchTask();
}).catch(err=>{
         toast.error("Failed To Update")
      })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4 p-5">
      {/* To-Do */}
      <div
      key="toId"
        className="bg-gray-100 p-4 rounded"
        ref={todoDrop}
      >
        <div className="flex gap-2 justify-center">
        <h2 className="text-lg font-bold mb-2 text-center">To-Do</h2>
        <p className="border rounded-full w-7 h-7 text-center bg-gray-600 text-white">{toDos.length}</p>
        </div>
        {toDos.map((taskData) => (
          < Tasks  key={taskData._id} task={taskData} handleDelete={handleDelete}></Tasks>
        ))}
      </div>

      {/* In-Progress */}
      <div
      key="progressId"
      ref={inProgressesDrop}
        className="bg-yellow-100 p-4 rounded"
      >
        <div className="flex gap-2 justify-center">
        <h2 className="text-lg font-bold mb-2 text-center">In-Progress</h2>
        <p className="border rounded-full w-7 h-7 text-center bg-yellow-300">{inProgresses.length}</p>
        </div>
        {inProgresses.map((taskData) => (
          < Tasks  key={taskData._id} task={taskData} handleDelete={handleDelete}></Tasks>
        ))}
      </div>

      {/* Done*/}
      <div
      key="doneId"
      ref={doneDrop}
        className="bg-green-100 p-4 rounded"
      >
         <div className="flex gap-2 justify-center">
        <h2 className="text-lg font-bold mb-2 text-center">Done</h2>
        <p className="border rounded-full w-7 h-7 text-center text-white bg-blue-500">{dones.length}</p>
        </div>
        {dones.map((taskData) => (
          < Tasks key={taskData._id} task={taskData} handleDelete={handleDelete}></Tasks>
        ))}
      </div>
    </div>
  );
};
const Tasks = ({task, handleDelete}) =>{
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id:task._id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
    //   console.log(isDragging);

 
return (
    <div
    key={task._id}
    ref={drag}
    className={`p-5 flex justify-between gap-10 mb-2 bg-white shadow-md hover:shadow-xl rounded cursor-grabbing ${
        isDragging ? "opacity-30" : "opacity-100"
    }`}
  >
    <div>
    <h1 className="font-semibold text-xl">{task.title}</h1>
    <p className="py-2 text-sm">{task.description}</p>
    </div>
    <button onClick={()=>handleDelete(task._id)}><MdDelete className="text-red-600" size={25} /></button>
  </div>
)
}
export default CategoryLists;
