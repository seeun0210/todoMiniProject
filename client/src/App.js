import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: "my todo1",
      visible: true,
      done: false,
    },
    {
      id: 2,
      title: "my todo2",
      visible: true,
      done: false,
    },
    {
      id: 3,
      title: "my todo3",
      visible: true,
      done: false,
    },
  ]);

  const addItem = (newItem) => {
    newItem.id = todoItems.length + 1;
    newItem.visible = true;
    setTodoItems([...todoItems, newItem]);
  };

  const deleteItem = (targetItem) => {
    const newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);

    setTodoItems(newTodoItems); // 필터링 후 제거
  };

  const editItem = (id) => {
    const editItem = todoItems.id;
  };

  return (
    <div className="App">
      <AddTodo addItem={addItem} />
      {todoItems.map((item) =>
        item.visible ? (
          <Todo
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            editItem={() => editItem(item.id)}
          />
        ) : null
      )}
    </div>
  );
}

export default App;
