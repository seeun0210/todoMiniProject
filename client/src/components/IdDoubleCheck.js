import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function IdDoubleCheck({
  isIdChecked,
  setIsIdChecked,
  id,
  setId,
}) {
  const {
    register,
    handleSubmit, // 변경: 아이디 중복 확인 폼을 위한 handleSubmit
    formState: { errors },
    watch,
  } = useForm();
  const idDoubleCheck = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_DB_HOST}/idCheck`, {
        data,
      });
      console.log(res.data);
      if (!res.data) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("사용가능한 아이디입니다");
        setIsIdChecked(true);
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패", error);
    }
    setId(data.id);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(idDoubleCheck)}>
        {" "}
        {/* 아이디 중복 확인 폼 */}
        <input
          type="text"
          placeholder="ID"
          {...register("id", {
            required: "아이디를 입력해주세요",
            pattern: {
              value: /^[a-z0-9]{4,12}$/,
              message: "아이디는 4~12자, 영어 소문자, 숫자만 가능합니다",
            },
          })}
        ></input>{" "}
        {errors.id && <span>{errors.id.message}</span>}
        {isIdChecked ? (
          <span>사용가능한 아이디입니다</span>
        ) : (
          <button type="submit">아이디 중복 확인</button>
        )}
      </form>
    </div>
  );
}
