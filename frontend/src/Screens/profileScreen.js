import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { orderMyList } from "../actions/orderActions";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
const ProfileScreen = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrderList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrderList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(orderMyList());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
    setShowPassword(false);
  }

  return (
    <Row>
      <Col md={3}>
        <h2>user Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">Profile Updated Successfuly</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmpassword">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
            {showPassword ? (
              <AiFillEyeInvisible
                style={{ fontSize: "25px", cursor: "pointer", margin: "20px" }}
                onClick={() => {
                  setShowPassword(false);
                }}
              />
            ) : (
              <AiFillEye
                style={{ fontSize: "25px", cursor: "pointer", margin: "20px" }}
                onClick={() => {
                  setShowPassword(true);
                }}
              />
            )}
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>SHIPPED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id} style={{ color: "green" }}>
                  <th>{order._id}</th>
                  <th>{order.createdAt.substring(0, 10)}</th>
                  <th>${order.totalPrice}</th>
                  <th>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}{" "}
                  </th>
                  <th>
                    {order?.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}{" "}
                  </th>
                  <th>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant="dark" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
