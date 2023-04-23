import ItemCard from "./ItemCard";
import './ItemViewer.css';
import recipe from '../assets/recipe.jpg';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../ShopContext";

function ItemViewer() {
    const [items, setItems] = useState([]);
    const shopContext = useContext(ShopContext);

    useEffect(() => {
        axios.get('http://localhost:8080/items').then((response) => {
            setItems(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [items])

    const itemComponents = items.map((item, i) => {
        const existingContextItem = shopContext.items.filter((contextItem) => {
            return item.code === contextItem.code;
        });
        item.itemAmount = (existingContextItem.itemAmount > 0) ? existingContextItem.itemAmount : 0;
        return <ItemCard itemData={item} key={i} image={recipe} />
    });

    return (
        <div style={{position:"relative"}}>
            <div className='viewer'>
                {itemComponents}
            </div>
        </div>
    )
}

export default ItemViewer;