import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByName, refreshState, setFlag } from "../actions/index";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setFileName(e.target.value);
    return fileName;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName) {
      alert("File name required");
    } else {
      dispatch(filterByName(fileName));
      dispatch(setFlag(fileName));
      setFileName("");
    }
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }
  function handleKeyUp(event) {
    if (event.target.value === "") {
      dispatch(refreshState());
      dispatch(setFlag(""));
    }
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logotipo de la Compañia"
            width="200px"
            id="img"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Form className="d-flex ">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-control"
              aria-label="Search"
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
            />
            <Button variant="danger" onClick={handleSubmit} id="btn">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
