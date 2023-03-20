
import { StateContext } from "@/Context/StateContext";
import Pagination from "@/Shared/Pagination";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";

export default function Products() {
    const [limit, setLimit] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { selectedCategoryId, selectedBrandId } = useContext(StateContext);
    const router = useRouter();
    const { query } = router;
    // console.log(query);

    const products = GetProducts(query);
    useEffect(() => {
        router.query.limit = limit.toString();
        router.query.page = currentPage.toString();
        router.query.category = selectedCategoryId?.toString();
        router.query.brand = selectedBrandId?.toString();
        for (const key in query) {
            if (query[key] === undefined || query[key] === "" || query[key] === null) {
                delete query[key];
            }
        }
        router.push(router)
    }, [limit, currentPage,
        selectedCategoryId, selectedBrandId
    ])

    console.log(selectedBrandId);


    if (products?.data?.length === 0) return (
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-2xl font-semibold">No products found</h1>
            <Link href="/">
                <span className="ml-2 text-blue-500">Go back</span>
            </Link>
        </div>
    )

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10 justify-items-center">
                {products?.data?.map((product: any) => (
                    <div className="w-75 shadow-xl" key={product._id}>
                        <div className="">
                            <figure>
                                {/* use the 1st image from the array */}
                                {product?.images?.length > 0 && (<img className="w-full" src={product?.images[0]} alt="" />)}
                            </figure>
                            <div className="p-2">
                                <h5 className="text-md font-semibold">
                                    {product?.name?.slice(0, 25) + (product?.name?.length > 25 ? "..." : "")}
                                </h5>
                                <p className="text-md">
                                    {product?.description?.slice(0, 50) + (product?.description?.length > 50 ? "..." : "")}
                                </p>
                                <div className="">
                                    <button className="btn btn-primary btn-sm">Add to Cart</button>
                                </div>
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
    let params: { [key: string]: string } = {};
    for (const key in query) {
        console.log(query[key]);

        if (query[key] !== undefined && query[key] !== "" && query[key] !== null) {
            params = { ...params, [key]: query[key] }
        }
    }
    let querystr: string = ""
    for (const key in params) {
        querystr += `${key}=${params[key]}&`
    }
    querystr = querystr.slice(0, -1);


    const { data, isLoading } = useQuery({
        queryKey: ["products", query?.page, query?.limit, query?.sort, query?.order, query?.search, query?.category, query?.brand, query?.rating, query?.inStock, query?.fastDelivery],
        //    query will be done when the category is changed or brand is changed
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/products?${querystr}`);
            return res.json();
        }
    })
    return {
        data: data?.data,
        total: data?.count,
        isLoading
    }
}