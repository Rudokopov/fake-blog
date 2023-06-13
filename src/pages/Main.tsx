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
import Header from "../components/Header";

const PAGE_SIZE = 10;

const Main = () => {
  const dispatch = useAppDispatch();
  const { posts, status, currentPage } = useSelector(selectPostData);
  const [totalPages, setTotalPages] = useState(0);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = currentPage * 10;

  const onChangePage = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
    setComments([]);
    window.scrollTo(0, 0);
  }, []);

  const getPosts = async () => {
    dispatch(fetchPosts());

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const paginatedPosts = _.chunk(posts, PAGE_SIZE);
    setTotalPages(paginatedPosts.length);
  }, [posts]);
  return (
    <section>
      <Header />
      <Container>
        <Row xs={1} md={2} className="g-4">
          {posts.slice(startIndex, endIndex).map((post, i) => {
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
    </section>
  );
};

export default Main;
