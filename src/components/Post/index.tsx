import React from "react";
import styles from "./post.module.scss";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

type PostProps = {
  image: string;
  title: string;
  description: string;
  commentsCount: number;
};

const Post: React.FC<PostProps> = (props) => {
  const { image, title, description, commentsCount } = props;
  return (
    <Container className={styles.container}>
      <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card className={styles.card}>
              <Card.Img
                className={styles.image}
                variant="top"
                src="https://images.unsplash.com/photo-1675426513962-1db7e4c707c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
              />
              <Card.Body>
                <Card.Title className={styles.title}>Card title</Card.Title>
                <Card.Text className={styles.paragraph}>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <div className="d-flex align-items-center mt-3">
                  <img
                    src="https://images.unsplash.com/photo-1686383094935-7e8c0d7105a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    alt="User Avatar"
                    className={styles.avatar}
                  />

                  <span>Нина</span>
                </div>
                <Card.Footer>
                  <small className="text-muted">48 комментариев</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Post;
