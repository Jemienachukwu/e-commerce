import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productUpdateReducer,
  productCreateReducer,
  productReviewReducer,
  productTopRatedReducer,
} from "./reducer/productReducers";
import { cartReducer } from "./reducer/cartReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  updateUserReducer,
} from "./reducer/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMyListReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListReducer,
} from "./reducer/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  productReview: productReviewReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userUpdate: updateUserReducer,
  userRegister: userRegisterReducer,

  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: orderMyListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const ShippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: ShippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
