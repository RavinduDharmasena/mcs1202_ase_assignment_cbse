import ItemCard from "./ItemCard";
import './ItemViewer.css';
import recipe from '../assets/recipe.jpg';
import axios from "axios";
import { useEffect, useState } from "react";

function ItemViewer() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/items').then((response) => {
            // console.log(response.data.items);
            setItems(response.data.items);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const itemComponents = items.map((item, i) => {
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