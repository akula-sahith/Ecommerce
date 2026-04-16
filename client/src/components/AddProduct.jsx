import { useState } from "react";
import API from "../api/axios";

export default function AddProduct() {
 const [name, setName] = useState("");
const [desc, setDesc] = useState("");
const [price, setPrice] = useState("");
const [image, setImage] = useState(null);

  function handleAddProduct(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", Number(price));
    formData.append("image", image);

    API.post("/product/add", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
}).then((res) => {
        if (res.status === 201) {
          alert("Product added Succesfully");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Product is not added");
      });
  }

  return (
    <>
      <form onSubmit={handleAddProduct}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Product Description
          </label>
          <input
            type="text"
            className="form-control"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </>
  );
}
