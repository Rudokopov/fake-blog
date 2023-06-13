import React, { useState } from "react";
import styles from "./post.module.scss";
import { Button, Card } from "react-bootstrap";
import { fetchComments } from "../../app/slices/post/slice";
import { useAppDispatch } from "../../app/store";
import { Comment } from "../../app/slices/post/types";

type PostProps = {
  postId: number;
  image: string;
  title: string;
  description: string;
  commentsCount: number;
};

const Post: React.FC<PostProps> = (props) => {
  const dispatch = useAppDispatch();
  const [currentsComments, setCurrentsComments] = useState<Comment[]>([]);
  const [isShowComments, setShowComments] = useState(false);
  const { image, title, description, commentsCount, postId } = props;

  const showComments = async () => {
    try {
      const res = await dispatch(fetchComments(postId));
      const comments = res.payload;
      if (comments) {
        setCurrentsComments(comments as Comment[]);
      }
    } catch (err) {
      alert("При запросе комментариев произошла ошибка");
    }
  };

  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Img className={styles.image} variant="top" src={image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.paragraph}>{description}</Card.Text>
        <div className="d-flex align-items-center mt-4">
          <img
            src="https://images.unsplash.com/photo-1686383094935-7e8c0d7105a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt="User Avatar"
            className={styles.avatar}
          />

          <span>Нина</span>
        </div>
        <Card.Footer className="mt-auto">
          <Button
            onClick={async () => {
              await showComments();
              console.log(currentsComments);
              setShowComments(true);
            }}
          >
            <small className="text-muted">{commentsCount} комментария</small>
          </Button>
        </Card.Footer>
        {isShowComments &&
          currentsComments.map((item: Comment, i: number) => {
            return (
              <div key={i}>
                <h4>{item.email}</h4>
                <p>{item.body}</p>
              </div>
            );
          })}
      </Card.Body>
    </Card>
  );
};

export default Post;
