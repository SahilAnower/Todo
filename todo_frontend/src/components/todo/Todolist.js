import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";
import toast from "react-hot-toast";
import styles from "./Todolist.module.css";
import Button from "../utils/Button";

function Todolist() {
  const [todoList, setTodoList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTodo.title <= 0) {
      toast.error("Title is Empty");
      return;
    }
    try {
      const {data} = await axios.post("http://localhost:8000/user/todo", newTodo);
      toast.success("New Todo is Created");
      setIsAddingNew(false);
      setNewTodo({
        title: "",
        description: "",
      });
      setTodoList([data, ...todoList]);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const data  = await axios.get("http://localhost:8000/user/todo/me");
      setTodoList(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/user/todo/${id}`);
      toast.success("Todo Successfully Deleted");
      setTodoList(todoList.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className={styles.todoList}>
      <div>
        <Button
          type="button"
          onClick={addNewButtonClick}
          text={isAddingNew ? "Cancel new todo" : "Add new todo"}
        />
        {isAddingNew && (
          <form onSubmit={addNewTask} className={styles.form}>
            <input
              type="text"
              name="title"
              value={newTodo.title}
              placeholder="title"
              onChange={inputHandler}
              className={styles.input}
            />
            <input
              type="text"
              name="description"
              value={newTodo.description}
              placeholder="description"
              onChange={inputHandler}
              className={styles.input}
            />
            <Button type="submit" text="Add" />
          </form>
        )}
      </div>
      <div>
        {todoList.length > 0 ? (
          todoList.map((todo) => (
            <Todo todo={todo} key={todo._id} deleteHandler={deleteHandler} />
          ))
        ) : (
          <h3>No Todo Found for you</h3>
        )}
      </div>
    </div>
  );
}

export default Todolist;
