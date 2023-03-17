import Products from "@/Products/Products";
import Navbar from "@/Shared/Navbar";
import Home from "./Home/Home";

export default function Index() {
  return (
    <div className="min-h-screen container mx-auto">
      <Navbar />
      <Home />
    </div>
  )
}