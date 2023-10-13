import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import axios from "axios";

function App() {
  console.log(process.env.REACT_APP_DB_HOST);
  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_DB_HOST}/todos`);
      setTodoItems(res.data);
      console.log(res.data);
    };
  }, []);
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

  const addItem = async (newItem) => {
    // newItem.id = todoItems.length + 1;
    // newItem.visible = true;
    // newItem.done = false;
    // setTodoItems([...todoItems, newItem]);
    const res = await axios.post(
      `${process.env.REACT_APP_DB_HOST}/todo`,
      newItem
    );
    console.log(res.data);
    setTodoItems([...todoItems, res.data]);
  };

  const deleteItem = async (targetItem) => {
    await axios.delete(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`
    );
    const newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);

    setTodoItems(newTodoItems); // 필터링 후 제거
  };

  const updateItem = async (targetItem) => {
    // const editItem = ;
    await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`,
      targetItem
    );
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
            updateItem={updateItem}
          />
        ) : null
      )}
    </div>
  );
}

export default App;
