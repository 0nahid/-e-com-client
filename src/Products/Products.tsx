import Pagination from "@/Shared/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function Products() {
    const [limit, setLimit] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const router = useRouter();
    const { query } = router;
    console.log(query);

    const products = GetProducts(query);
    useEffect(() => {
        router.query.limit = limit.toString();
        router.query.page = currentPage.toString();
        router.push(router)
    }, [limit, currentPage])


    if (products?.data?.length === 0) return <h1>No products</h1>

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10 justify-items-center">
                {products?.data?.map((product: any) => (
                    <div className="card card-compact card-bordered w-75 bg-base-100 shadow-xl" key={product._id}>
                        <div className="card-body">
                            <figure>
                                <img src="" alt="" />
                            </figure>
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

            {/* pagination */}
            <div className="flex justify-center">
                <Pagination total={products?.total} limit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage}
                    setLimit={setLimit}
                />
            </div>
        </>
    )
}


function GetProducts(query: any) {
    const { data } = useQuery({
        queryKey: ["products", query?.page, query?.limit, query?.sort, query?.order, query?.search, query?.category, query?.brand, query?.rating, query?.inStock, query?.fastDelivery],
        queryFn: () => fetch(`http://localhost:5000/api/v1/products?limit=${query.limit}&page=${query.page}`).then(res => res.json())
    })
    return {
        data: data?.data,
        total: data?.count,
    }
}