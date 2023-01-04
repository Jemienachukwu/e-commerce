import React from "react";
import ReactLoading from "react-loading";

const Loader = () => (
  <>
    <ReactLoading
      type="bars"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    />
  </>
);

export default Loader;
