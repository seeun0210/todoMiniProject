import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes, // Routes를 추가
  Route,
  Navigate,
} from "react-router-dom";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from "axios";

function Main({ isLoggedIn, todoItems, addItem, deleteItem, updateItem }) {
  return (
    <div>
      <h1>📄MY TODO APP</h1>
      {isLoggedIn ? (
        <div>
          <AddTodo addItem={addItem} />
          <div className="todoItemContainer">
            {todoItems.map((item) => (
              <Todo
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            ))}
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isSignupView, setIsSignupView] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const getTodos = async () => {
        const res = await axios.get(`${process.env.REACT_APP_DB_HOST}/login`);
        setTodoItems(res.data);
      };
      getTodos();
    }
  }, [isLoggedIn]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
  };

  const addItem = async (newItem) => {
    const res = await axios.post(
      `${process.env.REACT_APP_DB_HOST}/todo`,
      newItem
    );
    setTodoItems([...todoItems, res.data]);
  };

  const deleteItem = async (targetItem) => {
    await axios.delete(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`
    );
    const newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(newTodoItems);
  };

  const updateItem = async (targetItem) => {
    await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`,
      targetItem
    );
  };

  const handleLoginView = () => {
    setIsLoginView(true);
    setIsSignupView(false);
  };

  const handleSignupView = () => {
    setIsLoginView(false);
    setIsSignupView(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {" "}
          {/* Routes로 감싸기 */}
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                todoItems={todoItems}
                addItem={addItem}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : isLoginView ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Signup onSignup={handleLogin} />
              )
            }
          />
        </Routes>
      </Router>
      {!isLoggedIn && (
        <div>
          <p>아직 계정이 없으신가요? </p>
          <button onClick={handleSignupView}>회원가입하러가기</button>
        </div>
      )}
    </div>
  );
}

export default App;
