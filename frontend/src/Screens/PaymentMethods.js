import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../component/formContainer";
import { savepaymentMethods } from "../actions/cartAction";
import CheckoutSteps from "../component/CheckoutSteps";

const PaymentMethodsScreen = () => {
  let navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(savepaymentMethods(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handelSubmit}>
        <Form.Group>
          <Form.Label as="legend">select method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="paypal or credit card"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodsScreen;
