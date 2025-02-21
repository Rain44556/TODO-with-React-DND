import React, { useState } from "react";
import CategoryLists from "./CategoryLists";
import Select from 'react-select'

const AddTask = () => {
  const [task, setTask] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { value: "TO-DO", label: "TO-DO" },
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

  const handleAddTask = (e) => {
    e.preventDefault();

    const addTaskForm = e.target;
    const title = addTaskForm.title.value;
    const description = addTaskForm.description.value;
    const category = selectedCategory ? selectedCategory.value : null;
    const newTasks = {title, description, category};
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

              <Select
                options={categories}
                name="category"
                className="w-full mt-1 border border-gray-300 p-2 rounded-lg"
                classNamePrefix="select"
                onChange={setSelectedCategory}
              ></Select>

              <button className="btn btn-neutral mt-4">Add</button>
            </fieldset>
          </div>
        </form>
      </div>

      {/* show the list of category */}
      <CategoryLists task={task} setTask={setTask}></CategoryLists>
    </div>
  );
};

export default AddTask;
