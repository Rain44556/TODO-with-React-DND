import React, { useContext, useState } from "react";
import CategoryLists from "./CategoryLists";
import Select from 'react-select'
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const AddTask = () => {
  // const [task, setTask] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  // const categories = [
  //   { value: "TO-DO", label: "TO-DO" },
  //   { value: "In Progress", label: "In Progress" },
  //   { value: "Done", label: "Done" },
  // ];

  const handleAddTask = (e) => {
    e.preventDefault();

    const addTaskForm = e.target;
    const title = addTaskForm.title.value;
    const description = addTaskForm.description.value;
    // const category = selectedCategory ? selectedCategory.value : null;

    // show warning
    if(title.length > 50){
      return toast.warning("Not more than 50 characters")
    }
    if(description.length > 100){
      return toast.warning("Not more than 100 characters")
    }

    const newTasks = {title, description};

    fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(
        {...newTasks,
          timestamp: new Date().toLocaleString(),
          category: "To-Do", 
          email: user.email})
  })
      .then(res => {
          return res.json()})
      .then(data => {
          if (data.insertedId) {
             toast.success("Successfully Added")
              navigate("/categoryLists");
          }
      })
      .catch(err=>{
         toast.error("Failed To Add")
      })
  };


  return (
    <div className="my-14">

      {/* add the task */}
      <div className="hero">
        <form
          onSubmit={handleAddTask}
          className="card bg-base-100 w-full max-w-sm shadow-sm">
          <div className="card-body">
            <h1 className="text-xl text-center">Add Your Task</h1>
            <fieldset className="fieldset">
              <input
                type="text"
                name="title"
                className="input"
                placeholder="Title"/>

              <input
                type="text"
                name="description"
                className="input"
                placeholder="Description"
                maxLength="200"/>

              {/* <Select
                options={categories}
                name="category"
                className="w-full mt-1 border border-gray-300 p-2 rounded-lg"
                classNamePrefix="select"
                onChange={setSelectedCategory}
              ></Select> */}

              <button className="btn btn-neutral mt-4">Add</button>
            </fieldset>
          </div>
        </form>
      </div>

      {/* show the list of category */}
      <CategoryLists></CategoryLists>
    </div>
  );
};

export default AddTask;
