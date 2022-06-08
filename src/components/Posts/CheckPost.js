import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";

const CheckPost = () => {
  const [post, setPost] = useState([]);
  const link = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [inputInner, setInputInner] = useState(post.text);
  const [editor, setEditor] = useState(false);
  const [fetching, setFetching] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    const request = async () => {
      const responce = await axios.get(
        `https://test.flcd.ru/api/post/${link.id}`
      );
      setPost(responce.data);
      setFetching(false);
    };
    request()
    
  }, []);

  useEffect(() => {
    const takeUserId = async () => {
      const user = await axios
        .get(`https://test.flcd.ru/api/user/self`, config)
        .then((responce2) => responce2.data.id);
      return user;
    };
  
    const isEditor = async () => {
      if (fetching === false) {
        if ((await takeUserId()) === post.user_id) {
          setEditor(true);
        } else {
          setEditor(false);
        }
      } 
    };
  
    if (localStorage.length > 0) {
      isEditor();
    }
  }, [fetching])



  const deletePost = async () => {
    await axios.delete(`https://test.flcd.ru/api/post/${link.id}`, config);
    navigate("/posts");
  };

  const editPost = async () => {
    setEdit(!edit);
  };

  const sendPost = async (data) => {
    await axios.patch(
      `https://test.flcd.ru/api/post/${link.id}`,
      { text: data },
      config
    );
    navigate("/posts");
  };

  return (
    <div>
      <h1>Пост {post.id}</h1>
      <div className="information">
        <h1>Название: {post.text}</h1>
        {editor ? (
          <>
            {" "}
            {edit ? (
              <input onChange={(e) => setInputInner(e.target.value)} />
            ) : null}
            {localStorage.getItem("token") ? (
              <button onClick={() => deletePost()}>Удалить пост</button>
            ) : null}
            {localStorage.getItem("token") && !edit ? (
              <button onClick={() => editPost()}>Изменить пост</button>
            ) : null}
            {localStorage.getItem("token") && edit ? (
              <button onClick={() => editPost()}>Не изменять пост</button>
            ) : null}
            {edit ? (
              <button onClick={() => sendPost(inputInner)}>Готово</button>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CheckPost;
