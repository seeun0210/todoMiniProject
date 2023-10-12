import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

export default function TodoList({ todoList, handleDelete, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          todoList={todoList}
          handleDelete={handleDelete}
          setTodoList={setTodoList}
        />
      ))}
    </ul>
  );
}
TodoList.propTypes = {
  todoList: PropTypes.array,
  handleDelete: PropTypes.func,
  setTodoList: PropTypes.func,
};
