import Products from "@/Products/Products";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";

export default function Home() {
    return (
        <>
            <div className="flex justify-between">
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Products />
                </div>
            </div>
        </>
    )
}
