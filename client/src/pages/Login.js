import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onValid = async (data) => {
    // data {id: 'asdf', pw: '4838aass!!A'}
    try {
      const res = await axios.post(`${process.env.REACT_APP_DB_HOST}/login`, {
        data,
      });
      console.log(res.data.result);
      res.data.result
        ? alert("로그인성공!")
        : alert("로그인 실패(아이디나 비밀번호 틀림 다시 생각해보셈)");
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          placeholder="ID"
          {...register("id", {
            required: "아이디를 입력해주세요",
            pattern: {
              value: /^[a-z0-9]{4,12}$/,
              message: "아이디는 영어소문자, 숫자만 가능합니다",
            },
          })}
        ></input>
        {errors.id && <span>{errors.id.message}</span>}
        <br />
        <input
          type="password"
          placeholder="PW"
          {...register("pw", {
            required: "비밀번호를 입력해주세요",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "비밀번호는 8자 이상, 영문 대문자, 소문자, 숫자, 특수 문자 포함해야합니다.",
            },
          })}
        ></input>
        {errors.pw && <span>{errors.pw.message}</span>}
        <button type="submit">LOGIN</button>
      </form>
      <span>아직 계정이 없으신가요?</span>
      <Link to="/signup">SIGNUP</Link>
    </div>
  );
}
