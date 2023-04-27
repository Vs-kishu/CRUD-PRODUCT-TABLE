import React from "react";

const Popup = (props) => {
  const product = props.product;
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <h2>PRODUCT ID : {product.id}</h2>
        <h3>Product Title : {product.title}</h3>
        <img
          style={{ width: "200px" }}
          src={product.image}
          alt="product-img"
        ></img>
        <h3>Price : {product.price}</h3>
        <p>Product Description : {product.description}</p>
        <p>Product Category : {product.category}</p>
      </div>
    </div>
  );
};

export default Popup;
