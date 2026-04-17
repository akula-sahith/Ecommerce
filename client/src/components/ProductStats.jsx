import { useEffect , useState } from "react"
import API from "../api/axios"
export default function ProductStats(){
    const [products,setProducts] = useState([])

    useEffect(()=>{
        console.log("Token:", localStorage.getItem("token"))
        API.get("/product/vendorStats")
        
        .then((res)=>{
            if(res.status===200){
                setProducts(res.data.products)
            }else{
                alert("Unable to fetch the stats")
            }
        }).catch(()=>{
            alert("Unable to fetch the stats")
        })
    },[])

    return (
        products.length > 0 ? (
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
                                <p className="card-text">
                                    Purchases: {product.numberOfPurchases}
                                </p>
                                <p className="card-text">
                                    Carts: {product.numberOfCarts}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>No Products Found</p>
        )
    )
}