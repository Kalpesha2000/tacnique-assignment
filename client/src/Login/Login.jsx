import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = () => {
    if (
      values.email === import.meta.env.VITE_EMAIL &&
      values.password === import.meta.env.VITE_PASSWORD
    ) {
      localStorage.setItem("logIn", true);
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };
  return (
    <>
      <Container fluid>
        <Row
          style={{ height: "100vh" }}
          className="justify-content-center align-items-center"
        >
          <Col md={4} xs={12}>
            <Card>
              <Card.Header>
                <Card.Title className="text-center">Admin LogIn</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={handleOnChange}
                      name="email"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={handleOnChange}
                      name="password"
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                  <p className={`${error ? "d-block" : "d-none"} text-danger`}>
                    Email or Password is incorrect
                  </p>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleSubmit}
                  >
                    LogIn
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
