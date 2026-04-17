import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Cart() {
  const [cartItems, setcartItems] = useState([]);

  useEffect(() => {
    API.get("/product/cartItems")
      .then((res) => {
        if (res.status === 200) {
          setcartItems(res.data.cartItems || []);
        }
      })
      .catch(() => {
        alert("Failed to fetch cart");
      });
  }, []);

  return (
    <>
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <>
          <h1>My Cart</h1>
          <div className="row">
            {cartItems.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card mb-3">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.desc}</p>
                    <p className="card-text">₹ {product.price}</p>
                  </div>
                  <button className="btn btn-secondary mb-3">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </>
  );
}