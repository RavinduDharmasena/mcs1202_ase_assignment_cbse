import Header from "../components/Header";
import ItemViewer from "../components/ItemViewer";
import { useContext, useState } from "react";
import CartModal from "../components/CartModal";
import CarouselItem from "../components/CarouselItem";
import { ShopContext } from "../ShopContext";

function HomePage() {
    const shopContext = useContext(ShopContext)
    return (
        <>
            <Header items={shopContext.items} showCart={true}/>
            <CarouselItem />
            <ItemViewer />
            <CartModal />
        </>
    )
}

export default HomePage;