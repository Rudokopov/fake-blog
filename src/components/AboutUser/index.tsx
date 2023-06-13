import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./aboutUser.module.scss";

import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { userAvatar } from "../../utils/consts";
import Post from "../Post";
import Loaded from "../Loader/Loader";

type UserPosts = {
  title: string;
  body: string;
};

const AboutUser: React.FC = () => {
  const navigate = useNavigate();
  const [customStatus, setCustomStatus] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    username: string;
    email: string;
    phone: number;
  }>();

  const fakeLoading = () => {
    setCustomStatus(true);
    const timeout = setTimeout(() => {
      setCustomStatus(false);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const [userPosts, setUserPosts] = useState<UserPosts[]>([]);

  const { id } = useParams();
  const currentPostId = Number(id);

  const getUserInfo = () => {
    async function fetchUserById() {
      try {
        fakeLoading();
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
      {customStatus === true ? (
        <Loaded />
      ) : (
        <>
          <h1 className={styles.title}>Информация о пользователе</h1>
          <Card className={styles.card}>
            <Card.Img
              className={styles.avatar}
              variant="top"
              src={userAvatar}
            />
            <Card.Body>
              <Card.Title>Имя: {userInfo.name}</Card.Title>
              <Card.Text>
                Username: {userInfo.username} <br />
                Почта: {userInfo.email} <br />
                Phone: {userInfo.phone}
              </Card.Text>
            </Card.Body>
          </Card>
          <h2 className={styles.title}>Список постов</h2>
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
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <Button>Вернуться назад</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AboutUser;
