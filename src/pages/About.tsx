import React from "react";
import myAvatar from "../images/avatar-compress.jpeg";
import styles from "./about.module.scss";
import { Card, Container } from "react-bootstrap";
import GiftBox from "../components/GiftBox/GiftBox";

const About: React.FC = () => {
  return (
    <section className={styles.container}>
      <h1>Карточка бойца</h1>
      <Container className="d-flex justify-content-center">
        <Card>
          <Card.Img className={styles.avatar} variant="top" src={myAvatar} />
          <Card.Body>
            <Card.Title>Характеристики: </Card.Title>
            <Card.Text>
              Ссылка на резюме:
              <a
                target="_blank"
                href="https://kanevskaya.hh.ru/resume/7f031c08ff0bcbbfeb0039ed1f327644713668?hhtmFrom=resume_list"
              >
                Тыц
              </a>
            </Card.Text>
            <Card.Text>
              Сильные стороны: Готовность к переезду, идут очки, технологический
              стэк
            </Card.Text>
            <Card.Text>
              TS, JS, Solidity, React, NodeJS, MongoDB, Express, Redux Toolkit
            </Card.Text>
            <Card.Text>Слабые стороны: Умеет слушать критику</Card.Text>
            <Card.Text>
              Если бы за тестовые давали рубли, я бы не искал работу
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default About;
