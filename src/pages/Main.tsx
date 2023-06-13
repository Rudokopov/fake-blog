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
      <Container>
        <Row xs={1} md={2} className="g-4">
          {posts.slice(startIndex, endIndex).map((post, i) => {
            return (
              <Col key={i} md={6}>
                <Post
                  title={post.title}
                  description={post.body}
                  image="https://images.unsplash.com/photo-1675426513962-1db7e4c707c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
                  commentsCount={2}
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
