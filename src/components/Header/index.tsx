import React, { useState } from "react";
import myAvatar from "../../images/avatar-compress.jpeg";

import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import styles from "./header.module.scss";
import { Post } from "../../app/slices/post/types";
import { fetchPosts, setPosts } from "../../app/slices/post/slice";
import { useAppDispatch } from "../../app/store";

interface HeaderProps {
  processedPosts: Post[];
}

const Header: React.FC<HeaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const { processedPosts } = props;
  const [value, setValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = evt.target.value.toLowerCase();
    setValue(searchText);
  };

  const onClearInput = () => {
    setValue("");
    dispatch(fetchPosts());
  };

  const sortPostsAlphabetically = (posts: Post[]): void => {
    const sortedPosts = [...processedPosts]; // Создаем копию массива постов
    sortedPosts.sort((a, b) =>
      a.title.localeCompare(b.title, "en", { sensitivity: "base" })
    );

    dispatch(setPosts(sortedPosts));
  };

  const handleSortClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    sortPostsAlphabetically(processedPosts);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredPosts = processedPosts.filter((post) =>
      post.title.toLowerCase().includes(value)
    );

    dispatch(setPosts(filteredPosts));
  };

  return (
    <section className={styles.container}>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Fake-blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Form onSubmit={onSubmit} className="d-flex mb-5">
              <div className="custom-input-container">
                <Form.Control
                  type="text"
                  placeholder="Enter a value"
                  value={value}
                  onChange={onChangeInput}
                />
              </div>
              {value && (
                <Button className="clear-icon" onClick={onClearInput}>
                  X
                </Button>
              )}
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
            <div className="d-flex align-items-center d-lg-none">
              <img
                src={myAvatar}
                alt="Аватар"
                className="rounded-circle me-2"
                style={{ width: "32px", height: "32px" }}
              />
              <div>
                <p className="mb-0">Павел</p>
                <p className="mb-0">holabeda@gmail.com</p>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Button onClick={handleSortClick}>Сортировать по алфавиту</Button>
    </section>
  );
};

export default Header;
