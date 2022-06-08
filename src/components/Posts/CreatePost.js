import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const onSubmit = async (data) => {
    const responce = await axios.post(
      "https://test.flcd.ru/api/post",
      data,
      config
    );
    navigate("/posts");
  };

  return (
    <div>
      <h1>Создать пост</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text2"
          {...register("text", { required: true, minLength: 0 })}
          placeholder="Введите текст статьи"
          type="text"
        />
        { localStorage.length > 0 ? <input disabled={!isValid} type="submit" placeholder="Зайти" /> : null}
        <div>
          {errors.title || errors.password ? "Заполните все поля" : null}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
