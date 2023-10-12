import React, { useState } from "react";

export default function AddTodo({ addItem }) {
  const [todoItem, setTodoItem] = useState({ title: "" });
  const onButtonClick = (e) => {
    console.log(e.target.value);
    addItem(todoItem);
    //input 초기화
    setTodoItem({
      title: "",
    });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Add tour new todo"
        value={todoItem.title}
        onChange={(e) => setTodoItem({ title: e.target.value })}
      />
      <button onClick={onButtonClick} onKeyDown={onButtonClick}>
        ADD
      </button>
    </div>
  );
}
