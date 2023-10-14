// Login.js
import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DB_HOST}/login`,
        {
          userId,
          password,
        }
      );
      onLogin(response.data);
    } catch (error) {
      // 인증 실패 처리
      console.error("로그인 실패", error);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="PW"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default Login;
