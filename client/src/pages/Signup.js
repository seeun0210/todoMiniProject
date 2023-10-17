import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IdDoubleCheck from "../components/IdDoubleCheck";
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [id, setId] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onValid = async (data) => {
    setIsSubmitting(true); // 요청이 시작될 때 버튼 비활성화

    console.log(id);
    console.log(data);
    const { email, pw, name } = data;

    try {
      const res = await axios.post(`${process.env.REACT_APP_DB_HOST}/signup`, {
        id,
        email,
        pw,
        name,
      });

      if (res.status === 201) {
        // 회원가입 성공
        alert("회원가입이 성공적으로 완료되었습니다.");
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmedPassword = watch("confirmedPassword", "");
  const onInValid = (data) => {
    if (!isIdChecked) {
      alert("아이디 중복 확인을 먼저 수행해야 합니다.");
      return;
    }

    // 비밀번호 확인 필드 값 가져오기
    const confirmedPassword = data.confirmedPassword;

    if (data.pw !== confirmedPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <IdDoubleCheck
        isIdChecked={isIdChecked}
        setIsIdChecked={setIsIdChecked}
        id={id}
        setId={setId}
      />
      <hr />
      <form onSubmit={handleSubmit(onValid, onInValid)}>
        <input
          type="text"
          placeholder="이름"
          {...register("name", {
            required: "이름을 입력해주세요",
            pattern: {
              value: /^[가-힣]{2,5}$/,
              message: "2~5글자의 한글 이름을 입력해주세요",
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
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
                "비밀번호는 8자 이상, 영문 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.",
            },
          })}
        ></input>
        {errors.pw && <span>{errors.pw.message}</span>}
        <br />
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register("confirmedPassword", {
            required: "비밀번호 확인을 입력해주세요",
            validate: (value) =>
              value === confirmedPassword || "비밀번호가 일치하지 않습니다",
          })}
        ></input>
        {errors.confirmedPassword && (
          <span>{errors.confirmedPassword.message}</span>
        )}
        <hr />
        <input
          type="email"
          placeholder="todo@todo.com"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
        ></input>

        {errors.email && <span>{errors.email.message}</span>}
        <hr />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "가입 중..." : "가입"}
        </button>
      </form>
    </div>
  );
}
