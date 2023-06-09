import { StateContext } from "@/Context/StateContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from 'react';
import Brand from "./Brand";
import Range from "./Range";

interface Category {
    _id: string;
    name?: string;
    brand?: string[];
    products?: string[];
}

export default function Category() {
    const { selectedCategoryId, setSelectedCategoryId, setSelectedBrandId } = useContext(StateContext);

    const { isLoading, isError, data } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/categories/`);
            return res.json();
        },
    });

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = event.target.value;
        //    when i click on a category, i want to deselect the brand that was selected
        setSelectedBrandId(null);
        if (categoryId === selectedCategoryId) {
            // If the same category is clicked again, deselect it
            setSelectedCategoryId(null);
        }
        else {
            setSelectedCategoryId(categoryId);
        }

    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <>
            <h2 className="text-lg font-bold mb-2">Categories</h2>
            <ul className="flex flex-col gap-1">
                {data?.data?.map((category: Category) => (
                    <li key={category._id}>
                        <label className=" flex items-center">
                            <input
                                type="radio"
                                name="category"
                                className="radio radio-xs mr-2"
                                value={category._id}
                                checked={selectedCategoryId === category._id}
                                onChange={handleCategoryChange}
                            />
                            {category.name}
                        </label>
                    </li>
                ))}
            </ul>
            {/* Brand under the category */}
            {selectedCategoryId && <Brand selectedCategoryId={selectedCategoryId} />}

            {/* Range */}
            <Range />
        </>
    );
}
