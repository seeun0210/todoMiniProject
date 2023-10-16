// Signup.js
import React, { useState } from "react";
import axios from "axios";

function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const handleSignup = async (req, res) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_DB_HOST}/signup`, {
        username,
        userId,
        password,
        userEmail,
      });
      onSignup(res.data);
    } catch (error) {
      // 회원가입 실패 처리
      console.error("회원가입 실패", error);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="사용자 이름"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="email"
        placeholder="sesac@naver.com"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default Signup;
