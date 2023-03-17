import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';

interface Category {
    _id: string;
    name?: string;
    brand?: string[];
    products?: string[];
}

export default function Category() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const { isLoading, isError, data } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/v1/categories/`);
            return res.json();
        },
    });

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = event.target.value;
        if (categoryId === selectedCategoryId) {
            // If the same category is clicked again, deselect it
            setSelectedCategoryId(null);
        } else {
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
        </>
    );
}
