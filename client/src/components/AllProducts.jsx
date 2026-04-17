import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/product/all")
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("Unable to fetch the products");
      });
  }, []);

  function handleAddToCart(productId) {
    try{
      API.post("/product/addToCart",{productId}).then((res)=>{
        if(res.status===200){
            alert("Product added to cart successfully")
        }else{
            alert("Unable to add the product to cart")
        }
      })
    }catch(err){
        alert("Unable to add the product to cart")
    }
  }

  return (
    <>
      <h1>All Products</h1>

      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
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
                <button className="btn btn-primary mb-3" onClick={()=>{handleAddToCart(product._id)}}>Add to Cart</button>
                <button className="btn btn-secondary mb-3">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </>
  );
}