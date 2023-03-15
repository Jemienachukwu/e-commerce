import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Product from "../component/Product";
import { listProducts } from "../actions/productsAction";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { useParams } from "react-router-dom";
import Paginate from "../component/Paginate";
import Meta from "../component/Meta";
import ProductCarousel from "../component/ProductCarousel";
import { Link } from "react-router-dom";
import ProductCategoryHeader from "../component/ProductCategoryHeader";
const HomeScreen = () => {
  const dispatch = useDispatch();
  let { keyword } = useParams();
  let { pageNumber } = useParams() || 1;

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <div>
          {/* <ProductCarousel /> */}
          <ProductCategoryHeader />
        </div>
      ) : (
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Phones</p>
              <Button variant="outline-success" style={{ padding: "10px" }}>
                View more
              </Button>
            </div>
            {products
              .filter((product) => product.category === "Phones")
              .map((product) => (
                <Col xs={6} sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          {!keyword && (
            <div>
              {" "}
              <h1>Latest Prodocts</h1> <ProductCarousel />
            </div>
          )}
          <Row>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Laptops</p>
              <Button variant="outline-success" style={{ padding: "10px" }}>
                View more
              </Button>
            </div>
            {products
              .filter((product) => product.category === "Laptops")
              .map((product) => (
                <Col xs={6} sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Speakers</p>
              <Button variant="outline-success" style={{ padding: "10px" }}>
                View more
              </Button>
            </div>
            {products
              .filter((product) => product.category === "Speakers")
              .map((product) => (
                <Col xs={6} sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Accessories</p>
              <Button variant="outline-success" style={{ padding: "10px" }}>
                View more
              </Button>
            </div>
            {products
              .filter((product) => product.category === "Accessories")
              .map((product) => (
                <Col xs={6} sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Gaming</p>
              <Button variant="outline-success" style={{ padding: "10px" }}>
                View more
              </Button>
            </div>
            {products
              .filter((product) => product.category === "Gaming")
              .map((product) => (
                <Col xs={6} sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Electronics</p>
              <Button variant="outline-success" style={{ padding: "10px" }}>
                View more
              </Button>
            </div>
            {products
              .filter((product) => product.category === "Electronics")
              .map((product) => (
                <Col xs={6} sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
