import React from "react";
import "./Registration.css";
import { useForm } from "react-hook-form";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    await fetch("https://test.flcd.ru/api/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((responce) => {
      if (responce.status == 422) {
        alert("Такой АККАУНТ УЖЕ СУЩЕСТВУЕТ");
      } else {
        alert("Вы создали аккаунт");
      }
    })
  };

  return (
    <div className="register">
      <h1>Регистрация</h1>
      {localStorage.getItem("token") ? "Вы уже авторизованы" : <>      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Логин"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Почта"
        />
        <input
          {...register("password", { required: true, minLength: 2 })}
          type="password"
          placeholder="Введите пароль"
        />
        <input
          {...register("password_confirmation", {
            required: true,
            minLength: 2,
            validate: (val) => {
              if (watch("password") !== val) {
                return "баг";
              }
            },
          })}
          type="password"
          placeholder="Повторно введите пароль"
        />
        <input disabled={!isValid} type="submit" placeholder="Создать" />
        <div>
          {errors.login ||
          errors.email ||
          errors.password ||
          errors.confirmpassword
            ? "Заполните все поля"
            : null}
        </div>
      </form></>}
    </div>
  );
};

export default Registration;
