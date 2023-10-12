import React from "react";

export default function Todo({ item, deleteItem }) {
  const { id, title, done } = item;
  const onDeleteButtonClick = () => {
    deleteItem(id);
    console.log(id);
  };
  return (
    <div>
      <input type="checkbox" name={`todo${id}`} id={`todo${id}`} />
      <label htmlFor={`todo${id}`}> {title}</label>
      <button onClick={onDeleteButtonClick}>DELETE</button>
    </div>
  );
}
