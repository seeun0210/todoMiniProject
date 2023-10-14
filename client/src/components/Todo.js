import React, { useState } from "react";
import styles from "../styles/btnStyles.css";

export default function Todo({ item, deleteItem, updateItem }) {
  const [todoItem, setTodoItem] = useState(item);
  const { id, title, done } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부 추가

  const onDeleteButtonClick = () => {
    deleteItem(todoItem);
  };

  const offReadOnlyMode = () => {
    setReadOnly(false);
    setIsEditing(true); // 수정 모드로 변경
  };

  const editEventHandler = (e) => {
    const { title, ...rest } = todoItem;
    setTodoItem({
      title: e.target.value,
      ...rest,
    });
  };

  const onApplyButtonClick = () => {
    setReadOnly(true); // 수정 모드 종료
    setIsEditing(false); // 수정 모드 종료
    // 여기에서 수정된 todoItem을 저장 또는 업데이트할 수 있습니다.
    updateItem(todoItem);
  };
  const editKeyEventHandler = (e) => {
    if (e.key == "Enter") {
      setReadOnly(true);
      setIsEditing(false);
      updateItem(todoItem);
    }
  };
  const checkboxEventHandler = (e) => {
    console.log(e.target.checked);
    const { done, ...rest } = todoItem;
    const updatedItem = { done: e.target.checked, ...rest };
    setTodoItem(updatedItem);
    updateItem(updatedItem);
  };
  return (
    <div>
      <input
        type="checkbox"
        name={`todo${id}`}
        id={`todo${id}`}
        defaultChecked={done}
        onChange={checkboxEventHandler}
      />
      <input
        type="text"
        value={todoItem.title}
        readOnly={readOnly}
        onClick={offReadOnlyMode}
        onChange={editEventHandler}
        onKeyDown={editKeyEventHandler}
      />
      {isEditing ? (
        <button className="edit-button" onClick={onApplyButtonClick}>
          {/* Edit 아이콘 */}Edit
        </button>
      ) : null}
      <button className="delete-button" onClick={onDeleteButtonClick}>
        Delete {/* X 아이콘 */}
      </button>
    </div>
  );
}
