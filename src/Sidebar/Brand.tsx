import { useQuery } from "@tanstack/react-query";

export default function Brand({ selectedCategoryId }: { selectedCategoryId: string }) {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['brands', selectedCategoryId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/categories/${selectedCategoryId}`);
            return res.json();
        },
    });
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching data</div>
    console.log(data.data);

    return (
        <>
            <h2 className="text-lg font-bold mb-2">Brands</h2>
            <ul className="flex flex-col gap-1">
                {data?.data?.brand?.map((brand: any, index: number) => (
                    <li key={index}>
                        <label className=" flex items-center">
                            <input
                                type="radio"
                                name="brand"
                                className="radio radio-xs mr-2"
                                value={brand._id}
                            />
                            {brand.name}
                        </label>
                    </li>
                ))}
            </ul>
        </>
    )
}
