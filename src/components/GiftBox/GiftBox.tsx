import React from "react";
import styles from "./giftbox.module.scss";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const GiftBox: React.FC = () => {
  return (
    <div className={styles.container}>
      <Container className="d-flex flex-column align-items-center">
        <h2 className={styles.title}>
          Поздравляем, вам выпал легендарный боец!
        </h2>
        <p>Желаете забрать?</p>
        <Button className={styles.button} color="green">
          <Link className={styles.link} to="/about">
            О божечки, конечно!
          </Link>
        </Button>
      </Container>
    </div>
  );
};

export default GiftBox;
