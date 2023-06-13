import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import Post from "../components/Post";
import {
  fetchPosts,
  setCurrentPage,
  setComments,
} from "../app/slices/post/slice";
import { useAppDispatch } from "../app/store";
import { selectPostData } from "../app/slices/post/selectors";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { Pagination } from "../components/Pagination";
import Loaded from "../components/Loader/Loader";
import { Post as PostType } from "../app/slices/post/types";

const PAGE_SIZE = 10;

interface MainProps {
  processedPosts: PostType[];
}

const Main: React.FC<MainProps> = (props) => {
  const { processedPosts } = props;
  const dispatch = useAppDispatch();
  const { status, currentPage } = useSelector(selectPostData);
  const [customStatus, setCustomStatus] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = currentPage * 10;

  const fakeLoading = () => {
    setCustomStatus(true);
    const timeout = setTimeout(() => {
      setCustomStatus(false);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const onChangePage = useCallback((page: number) => {
    try {
      fakeLoading();
      dispatch(setCurrentPage(page));
      setComments([]);
      window.scrollTo(0, 0);
    } catch (err) {
      alert("Произошла ошибка при пагинации");
    }
  }, []);

  useEffect(() => {
    try {
      const paginatedPosts = _.chunk(processedPosts, PAGE_SIZE);
      setTotalPages(paginatedPosts.length);
    } catch (err) {
      alert("Произошла ошибка при пагинации");
    }
  }, [processedPosts]);
  return (
    <section>
      {customStatus === true ? (
        <Loaded />
      ) : (
        <>
          <Container>
            <Row xs={1} md={2} className="g-4">
              {processedPosts.slice(startIndex, endIndex).map((post, i) => {
                return (
                  <Col key={i} md={6}>
                    <Post
                      title={post.title}
                      description={post.body}
                      postId={post.id}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
          <div className="d-flex flex-column align-items-center mt-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={onChangePage}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Main;
