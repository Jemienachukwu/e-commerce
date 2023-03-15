import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="productCard" style={{ position: "relative" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          varient="top"
          className="productCardImg"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="m-0">
            <strong className="cardText">{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div" className="cardText">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text
          as="h3"
          // style={{ position: "absolute", bottom: "0", }}
          className="cardText"
        >
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
