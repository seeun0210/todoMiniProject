import React, { useState } from "react";

export default function Todo({ item, deleteItem, editItem }) {
  const [todoItem, setTodoItem] = useState(item);
  const { id, title, done } = item;
  const onDeleteButtonClick = () => {
    deleteItem(todoItem);
    console.log(id);
  };
  const onEditButtonClick = (id, title, done) => {
    editItem(id, title);
  };
  return (
    <div>
      <input type="checkbox" name={`todo${id}`} id={`todo${id}`} />
      <label htmlFor={`todo${id}`}> {title}</label>
      <button onClick={onDeleteButtonClick}>DELETE</button>
      <button onClick={onEditButtonClick}>Edit</button>
    </div>
  );
}
