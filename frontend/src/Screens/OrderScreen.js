import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { getOrderDetails, deliverOrder } from "../actions/orderActions";
import { PaystackButton } from "react-paystack";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import axios from "axios";

const OrderScreen = () => {
  let { id } = useParams();
  let { navigate } = useNavigate();
  const dispatch = useDispatch();

  const [err, setErr] = useState(false);

  const payment = JSON.parse(localStorage.getItem("paymentMethod"));

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  //order calculations
  if (!loading) {
    function addDecimals(number) {
      return (Math.round(number * 100) / 100).toFixed(2);
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
    }
    dispatch({ type: ORDER_PAY_RESET });
    dispatch(getOrderDetails(id));
  }, [dispatch, id, successDeliver, userInfo, navigate]);

  const componentProps = {
    email: userInfo.email,
    amount: parseInt(order?.totalPrice) * 100,
    metadata: {
      name: userInfo.name,
    },
    publicKey: process.env.REACT_APP_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: (res) => {
      const body = {
        id: order._id,
        reference: res.reference,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      if (res.status === "success") {
        axios
          .post("/api/orders/updatePastack", body, config)

          .catch((err) => {
            setErr(!err);
          });
      }
      window.location.reload();
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Shipping</h1>
              <p>
                <strong>Name:</strong> {userInfo.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {payment}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Order Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <Col>
                            <strong>Price : </strong>${item.price}
                          </Col>
                        </Col>
                        <Col md={4}>
                          ${item.qty * item.price} For {item.qty}{" "}
                          {item.qty > 1 ? "Items" : "Item"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <Row>
                    {loadingPay && <Loader />}
                    {err && <Message>{err}</Message>}
                    <PaystackButton {...componentProps} className="paystack" />
                  </Row>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Row>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        Mark As Shipped
                      </Button>
                    </Row>
                  </ListGroup.Item>
                )}
              <ListGroup.Item></ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default OrderScreen;
