import React, { useState } from "react";
import styles from "./post.module.scss";
import { Button, Card, Spinner } from "react-bootstrap";
import { fetchComments } from "../../app/slices/post/slice";
import { useAppDispatch } from "../../app/store";
import { Comment } from "../../app/slices/post/types";
import { postImage } from "../../utils/consts";
import { Link } from "react-router-dom";

type PostProps = {
  postId: number;
  title: string;
  description: string;
};

const Post: React.FC<PostProps> = (props) => {
  const dispatch = useAppDispatch();
  const [currentsComments, setCurrentsComments] = useState<Comment[]>([]);
  const [customStatus, setCustomStatus] = useState<boolean>(false);
  const [isShowComments, setShowComments] = useState(false);
  const { title, description, postId } = props;

  const fakeLoading = () => {
    setCustomStatus(true);
    const timeout = setTimeout(() => {
      setCustomStatus(false);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const handleShowComments = async () => {
    try {
      if (currentsComments.length !== 0) {
        setCurrentsComments([]);
        return;
      }
      const res = await dispatch(fetchComments(postId));
      const comments = res.payload;
      if (comments) {
        fakeLoading();

        setTimeout(() => {
          setCurrentsComments(comments as Comment[]);
        }, 500);
      }
    } catch (err) {
      alert("При запросе комментариев произошла ошибка");
    }
  };

  return (
    <Card className="h-100 d-flex flex-column mb-5">
      <Card.Img className={styles.image} variant="top" src={postImage} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.paragraph}>{description}</Card.Text>
        <div className="d-flex align-items-center mt-4">
          <Link key={postId} to={`/users/${postId}`}>
            <img
              src="https://images.unsplash.com/photo-1686383094935-7e8c0d7105a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              alt="User Avatar"
              className={styles.avatar}
            />
          </Link>
        </div>
        <Card.Footer className="mt-auto">
          {customStatus === true ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleShowComments();
                setShowComments(true);
              }}
            >
              <small className="text-muted">Комментари</small>
            </Button>
          )}
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
