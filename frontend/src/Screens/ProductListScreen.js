import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/productsAction";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/productsConstants";
import Paginate from "../component/Paginate";

const ProductListScreen = () => {
  let { pageNumber } = useParams() || 1;
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { Loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    Loading: LoadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    Loading: LoadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProducts,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProducts._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    createdProducts,
    successCreate,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    const delProduct = products.find((prod) => id === prod._id);
    const deletedProductName = `Are You Sure You Want To delete ${delProduct.name} ?`;
    if (window.confirm(deletedProductName)) {
      dispatch(deleteProduct(id));
      window.location.reload();
    }
  };
  const createHandler = (product) => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {LoadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {LoadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td> ${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/product/${product._id}/edit`}
                      className="my-2"
                    >
                      <Button variant="dark" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
