import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from "axios";

function Main({
  isLoggedIn,
  todoItems,
  addItem,
  deleteItem,
  updateItem,
  sessionId,
}) {
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
  const [sessionId, setSessionId] = useState(null);
  const [isLoginView, setIsLoginView] = useState(true); // isLoginView 변수 추가
  const [isSignupView, setIsSignupView] = useState(false); // isSignupView 변수 추가

  // 세션 아이디 가져오기
  // useEffect(() => {
  //   const getSessionId = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_DB_HOST}/get-session-id`
  //       );
  //       console.log("세션값 넘어옴?", res.data);
  //       setSessionId(res.data.sessionId);
  //     } catch (error) {
  //       console.error("Failed to get session ID:", error);
  //     }
  //   };

  //   getSessionId();
  // }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    const getSessionId = async (req, res) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_DB_HOST}/get-session-id`
        );
        console.log("세션값 넘어옴?", res.data);
        setSessionId(res.data.sessionId);

        const todoRes = axios.get(`${process.env.REACT_APP_DB_HOST}/todos`);

        setTodoItems(todoRes.data);
      } catch (error) {
        console.error("Failed to get session ID:", error);
      }
    };

    getSessionId();
  };

  const addItem = async (newItem, sessionId) => {
    const res = await axios.post(`${process.env.REACT_APP_DB_HOST}/todo`, {
      newItem,
      sessionId: 1,
    });
    console.log("client addItem", res.data);
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
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                todoItems={todoItems}
                addItem={addItem}
                deleteItem={deleteItem}
                updateItem={updateItem}
                sessionId={sessionId}
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
          <Route
            path="/signup" // New route for the signup page
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : isSignupView ? (
                <Signup onSignup={handleLogin} />
              ) : (
                <Login onLogin={handleLogin} />
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
