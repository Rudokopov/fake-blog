import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./aboutUser.module.scss";

import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { userAvatar } from "../../utils/consts";
import Post from "../Post";

type UserPosts = {
  title: string;
  body: string;
};

const AboutUser: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{
    name: string;
    username: string;
    email: string;
    phone: number;
  }>();

  const [userPosts, setUserPosts] = useState<UserPosts[]>([]);

  const { id } = useParams();
  const currentPostId = Number(id);

  const getUserInfo = () => {
    async function fetchUserById() {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUserInfo(data);
      } catch (err) {
        alert("Такого пользователя нет, вы будете перенаправленны на главную");
        navigate("/", { replace: true });
      }
    }
    fetchUserById();
  };

  const getUserPost = () => {
    async function fetchUserPosts() {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}/posts`
        );
        setUserPosts(data);
      } catch (err) {
        alert("Произошла ошибка при получении постов");
      }
    }
    fetchUserPosts();
  };

  useEffect(() => {
    getUserInfo();
    getUserPost();
  }, []);

  if (!userInfo) {
    return <>Загрузка ...</>;
  }
  return (
    <div className="container">
      <img src={userAvatar} alt="Картинка пользователя" />
      <h2>{userInfo.name}</h2>
      <p>{userInfo.username}</p>
      <p>{userInfo.email}</p>
      <h3>{userInfo.phone} ₽</h3>
      {userPosts &&
        userPosts.map((item, i) => {
          return (
            <Post
              key={i}
              title={item.title}
              description={item.body}
              postId={currentPostId}
            />
          );
        })}
      <Link to="/" className="button button--outline button--add go-back-btn">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default AboutUser;
