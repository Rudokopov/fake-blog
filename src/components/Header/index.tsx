import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <section className={styles.container}>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Fake-blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">About</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;