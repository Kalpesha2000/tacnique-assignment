import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`);

      setUsers(res.data.data);
    } catch (error) {
      alert(error);
    }
  };

  const addUser = async (values) => {
    setReload(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/add`,
        values
      );
      if (res.data.status) {
        alert("User added");
        setShow(false);
        setReload(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const editUser =async (values)=>{
    console.log(values)
    setReload(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/edit`,
        values
      );
      if (res.data.status) {
        alert("User updated!");
        setShow(false);
        setReload(true);
      }
    } catch (error) {
      alert(error);
    }
  }

  const deleteUser = async (id) => {
    setReload(false);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete/${id}`
      );
      if (res.data.status) {
        alert("User deleted");
        setShow(false);
        setReload(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (reload) {
      getAllUser();
    }
  }, [reload]);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    department: yup.string().required("Department is required"),
  });

  const formik = useFormik({
    initialValues: {
      userId:null,
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddUpdate(values);
    },
  });

  const setEditValuesToFormik = (item) => {
    formik.values.firstName = item.firstName;
    formik.values.lastName = item.lastName;
    formik.values.email = item.email;
    formik.values.department = item.department;
    formik.values.userId = item._id
  };
  const handleEditAdd = (value, item) => {
    if (value == "add") {
      setUserEdit(false);
      setShow(true);
      setEditValuesToFormik({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    } else if (value == "edit") {
      setUserEdit(true);
      setShow(true);
      setEditValuesToFormik(item);
    }
  };

  const handleAddUpdate = (values) => {
    if (userEdit) {
      editUser(values)
    } else {
      addUser(values);
    }
  };

  const navigate = useNavigate();
  const logOut = ()=>{
    localStorage.setItem("logIn",false)
    navigate("/")
  }

  return (
    <Container fluid>
      <Row className="justify-content-center py-4">
        <Col xs={12}>
          <h2 className="text-center">User Listing</h2>
        </Col>
        <Col md={8} xs={12}>
          <div className="my-2 d-flex justify-content-end gap-2">
            <Button variant="primary" onClick={() => handleEditAdd("add")}>
              Add User
            </Button>
            <Button variant="danger" onClick={logOut}>Logout</Button>
          </div>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0
                  ? users?.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>{item.department}</td>
                          <td>
                            <Button
                              variant="primary mx-2"
                              onClick={() => handleEditAdd("edit", item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteUser(item._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{userEdit ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter firstname"
                onChange={formik.handleChange}
                name="firstName"
                value={formik.values.firstName}
              />
              <p className="text-danger">
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lastname"
                onChange={formik.handleChange}
                name="lastName"
                value={formik.values.lastName}
              />
              <p className="text-danger">
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div>{formik.errors.lastName}</div>
                ) : null}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                name="email"
                value={formik.values.email}
              />
              <p className="text-danger">
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </p>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Department</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                name="department"
                type="text"
                placeholder="Enter department"
                value={formik.values.department}
              />
            </Form.Group>
            <p className="text-danger">
              {formik.touched.department && formik.errors.department ? (
                <div>{formik.errors.department}</div>
              ) : null}
            </p>
            <Button variant="primary" className="my-2" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Index;
