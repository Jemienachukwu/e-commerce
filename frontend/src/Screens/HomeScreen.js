import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../component/Product";
import { listProducts } from "../actions/productsAction";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { useParams } from "react-router-dom";
import Paginate from "../component/Paginate";
import Meta from "../component/Meta";
import ProductCarousel from "../component/ProductCarousel";
import { Link } from "react-router-dom";
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
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      )}
      <h1>Latest Prodocts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
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
