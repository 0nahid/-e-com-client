import { useQuery } from "@tanstack/react-query";

export default function Products() {
    const products = GetProducts();
    if (products?.data?.length === 0) return <h1>No products</h1>
    console.log(products);

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10 justify-items-center">
                {products?.data?.map((product: any) => (
                    <div className="card card-compact card-bordered w-75 bg-base-100 shadow-xl" key={product._id}>
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h5 className="card-title">
                                {product?.name?.slice(0, 25) + (product?.name?.length > 25 ? "..." : "")}
                            </h5>
                            <p>
                                {product?.description?.slice(0, 50) + (product?.description?.length > 50 ? "..." : "")}
                            </p>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-sm">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


function GetProducts() {
    const { data } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetch(`http://localhost:5000/api/v1/products`).then(res => res.json())
    })
    return data
}