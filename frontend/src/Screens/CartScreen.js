import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartAction";
import Message from "../component/Message";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const CartScreen = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let location = useLocation();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  useEffect(() => {
    id && dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);

  return <div>big dick boyyyyyyyyyyy</div>;
};

export default CartScreen;
