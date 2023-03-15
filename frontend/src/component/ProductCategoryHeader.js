import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const ProductCategoryHeader = () => {
  const displayItems = [
    {
      itemName: "Phone",
      img: "https://images.unsplash.com/photo-1659079998661-bc2fe8c5a307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhbXN1bmclMjBzMjJ8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      link: "/somthing",
    },
    {
      itemName: "Gaming",
      img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      link: "/somthing",
    },
    {
      itemName: "Accessories",
      img: "https://images.unsplash.com/photo-1566793474285-2decf0fc182a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvbmUlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      link: "/somthing",
    },
    {
      itemName: "Laptops",
      img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
      link: "/somthing",
    },
    {
      itemName: "Speakers",
      img: "https://images.unsplash.com/photo-1630152836113-ccbf6d1e5fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8amJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      link: "/somthing",
    },
    {
      itemName: "Television",
      img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmV0ZmxpeHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      link: "/somthing",
    },
  ];
  const MappedElement = ({ item }) => {
    const [hover, setHover] = useState(false);
    return (
      <Col
        className="categoryHeader"
        style={{
          backgroundImage: `url(${item.img})`,
        }}
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
      >
        <strong className={hover ? "bg-light" : "bg-transparent"}>
          {item.itemName}
        </strong>
      </Col>
    );
  };
  return (
    <Container fluid>
      <Row className="mb-3">
        {displayItems.map((item, i) => (
          <MappedElement item={item} key={i} />
        ))}
      </Row>
    </Container>
  );
};

export default ProductCategoryHeader;
