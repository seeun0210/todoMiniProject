import React, { useState } from "react";

export default function AddTodo({ addItem, sessionId }) {
  const [todoItem, setTodoItem] = useState({
    title: "",
    userId: `${sessionId}`,
  });
  const onButtonClick = (e) => {
    console.log(sessionId);
    console.log(e.target);
    addItem(todoItem);
    //input 초기화
    setTodoItem({
      title: "",
      userId: sessionId,
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
      <button onClick={onButtonClick}>➕</button>
    </div>
  );
}
