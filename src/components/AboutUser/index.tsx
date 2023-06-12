import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./aboutUser.module.scss";

type AboutUserProps = {
  avatar: string;
  username: string;
};

const AboutUser: React.FC<AboutUserProps> = (props) => {
  const { avatar, username } = props;
  return (
    <section>
      <Container className={styles.container}>
        <Image src={avatar} rounded className={styles.avatar} />
        <h4 className={styles.username}>{username}</h4>
      </Container>
    </section>
  );
};

export default AboutUser;
