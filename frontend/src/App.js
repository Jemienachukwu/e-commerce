import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Container } from "react-bootstrap";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
