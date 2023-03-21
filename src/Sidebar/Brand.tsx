import { StateContext } from "@/Context/StateContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export default function Brand({ selectedCategoryId }: { selectedCategoryId: string }) {
    console.log("selectedCategoryId", selectedCategoryId);
    
    const { selectedBrandId, setSelectedBrandId } = useContext(StateContext);
    const { isLoading, isError, data } = useQuery({
        queryKey: ['brands', selectedCategoryId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/categories/${selectedCategoryId}`);
            return res.json();
        },
    });
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching data</div>

    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const brandId = event.target.value;
        if (brandId === selectedBrandId) {
            // If the same brand is clicked again, deselect it
            setSelectedBrandId(null);
        } else {
            setSelectedBrandId(brandId);
        }
    };

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
                                checked={selectedBrandId === brand._id}
                                onChange={handleBrandChange}
                            />
                            {brand.name}
                        </label>
                    </li>
                ))}
            </ul>
        </>
    )
}
