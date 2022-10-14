import React, { useEffect } from "react";
// import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { getOrderDetails } from "../actions/orderActions";
import { PaystackButton } from "react-paystack";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import axios from "axios";
export const OrderScreen = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [state, setState] = React.useState(false);

  const payment = JSON.parse(localStorage.getItem("paymentMethod"));
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(order);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    function addDecimals(number) {
      return (Math.round(number * 100) / 100).toFixed(2);
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    console.log(order?.totalPrice);
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      if (!order || order._id === id) {
        dispatch(getOrderDetails(id));
      }
    }
  }, [order, id, dispatch, successPay]);

  const key = "pk_test_5608d48adde6e6434427bef8eb5238d9dc66c672";
  console.log(key);
  const componentProps = {
    email: user.email,
    amount: parseInt(order?.totalPrice) * 100,
    metadata: {
      name: user.name,
    },
    publicKey: key,
    text: "Pay Now",
    onSuccess: (res) => {
      const body = {
        id: order._id,
        reference: res.reference,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (res.status === "success") {
        axios
          .post("/api/orders/updatePastack", body, config)
          .then((resp) => {
            console.log(resp);
            setState(!state);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
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
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${user.email}`}>{user.email}</a>
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
                    <PaystackButton {...componentProps} />
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
