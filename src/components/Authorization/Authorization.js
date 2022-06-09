import React from "react";
import "./Authorization.css";
import { useForm } from "react-hook-form";
import axios from "axios";


const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });



  const onSubmit = async (data) => {
    const responce = await axios.post("https://test.flcd.ru/api/token", data);
    if (!responce.ok) {
      alert("Вы вошли в аккаунт");
      localStorage.setItem("token", responce.data.token);
      window.location.reload();

    } else {
      alert("Такого аккаунта нет");
    }
  };

  return (
    <div className="login">
      <h1>Вход в аккаунт</h1>
      {localStorage.getItem("token") ? (
        "Вы уже зашли"
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: true })}
            placeholder="Введите почту"
            type="text"
          />
          <input
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Введите пароль"
            type="password"
          />
          <input disabled={!isValid} type="submit" placeholder="Зайти" />
          <div>
            {errors.email || errors.password ? "Заполните все поля" : null}
          </div>
        </form>
      )}
    </div>
  );
};

export default Authorization;
