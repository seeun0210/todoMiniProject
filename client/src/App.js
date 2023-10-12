import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: "my todo1",
      visible: true,
    },
    {
      id: 2,
      title: "my todo2",
      visible: true,
    },
    {
      id: 3,
      title: "my todo3",
      visible: true,
    },
  ]);

  const addItem = (newItem) => {
    newItem.id = todoItems.length + 1;
    newItem.visible = true;
    setTodoItems([...todoItems, newItem]);
  };

  const deleteItem = (id) => {
    const newTodoItems = todoItems.map((item) =>
      item.id === id ? { ...item, visible: false } : item
    );
    setTodoItems(newTodoItems);
  };

  return (
    <div className="App">
      <AddTodo addItem={addItem} />
      {todoItems.map((item) =>
        item.visible ? (
          <Todo
            key={item.id}
            item={item}
            deleteItem={() => deleteItem(item.id)}
          />
        ) : null
      )}
    </div>
  );
}

export default App;
