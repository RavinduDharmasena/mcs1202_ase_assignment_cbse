import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import './utilities.css';
import './ItemCard.css';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../ShopContext';

function ItemCard(props) {
    const shopContext = useContext(ShopContext);
    const [itemAmount,setItemAmount] = useState(0);

    const prepareAndShowModal = () => {
        shopContext.setShow(true);
        const items = shopContext.items
        const existingItemIndex = items.findIndex((item) => {
            return item.code === props.itemData.code
        });

        if (existingItemIndex !== -1) {
            const item = items[existingItemIndex];
            item.itemAmount++;
            item.totalItemPrice = item.unitPrice * item.itemAmount;
            items[existingItemIndex] = item;
        }
        else {
            const item = {
                id: props.itemData.id,
                name: props.itemData.name,
                code: props.itemData.code,
                unitPrice: props.itemData.unitPrice,
                totalItemPrice: props.itemData.unitPrice,
                itemAmount: 1
            };
            items.push(item);
        }
        shopContext.setItems(items);
    }

    useEffect(() => {
        const existingContextItem = shopContext.items.filter((contextItem) => {
            return props.itemData.code === contextItem.code;
        });

        let existingCurrentItem = props.itemData;
        if (existingContextItem.length === 0) {
            existingCurrentItem.itemAmount = 0;
            setItemAmount(0);
        }
        else{
            existingCurrentItem.itemAmount = existingContextItem[0].itemAmount;
            setItemAmount(existingCurrentItem.itemAmount);
        }
    })

    const itemBadge = (itemAmount > 0) ? <Badge bg="success" className='badge badge-right uppercase'>{itemAmount} items added to the cart</Badge> : null;

    return (
        <Card className='inline-block m-1' style={{ width: '18rem' }}>
            <input type='hidden' value={props.itemData.code} />
            <Badge bg="danger" className='badge badge-left'>New</Badge>
            {itemBadge}
            <Card.Img variant="top" className='mt-1' src={props.image} width={100} height={300} />
            <Card.Body className="center">
                <Card.Title className='center'>{props.itemData.title}</Card.Title>
                <Card.Text>
                    {props.itemData.description}
                </Card.Text>
                <Card.Text>
                    <b>Unit Price: Rs. {props.itemData.unitPrice}.00</b>
                </Card.Text>
                <div className='center'>
                    <Button className='uppercase' onClick={() => { prepareAndShowModal(); }} variant="primary">Add to Cart</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ItemCard;