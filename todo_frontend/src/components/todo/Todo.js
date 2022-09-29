import React, { useState } from "react";
import toast from "react-hot-toast"
import axios from "axios"
import moment from "moment"
import styles from "./Todo.module.css"
import Button from "../utils/Button"

function Todo({ todo, deleteHandler }) {
  const [isCompleted, setIsCompleted] = useState(todo.completedOrNot);
  const [isLoading,setIsLoading] = useState(false)

  const handleCheckBoxClick = async() => {
    try{
      setIsLoading(true)
      await axios.put(`http://localhost:8000/user/todo/${todo._id}`,{
        completedOrNot: !isCompleted,
      })
      setIsCompleted(!isCompleted)
      toast.success("Todo completion status updated Successfully")
    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.todo}>
      <div onChange={handleCheckBoxClick}
      role="checkbox"
      aria-checked disabled={isLoading}
      className={styles.checkboxArea}
      >
        <input
          type="checkbox"
          checked={isCompleted}
          tabIndex={-1}
          readOnly
          disabled={isLoading}
        />
        <h2>Title: {todo.title}</h2>
        <p>Description: {todo.description}</p>
      </div>
      <div className={styles.todo_status}>
        <p>Date: {moment(todo.createdAt).format("MMM Do YYYY")}</p>
        <p>Status: {isCompleted ? "Completed" : "Incomplete"}</p>
      </div>
      <Button type="button" onClick={() => deleteHandler(todo._id)} text="Delete" />
    </div>
  );
}

export default Todo;
