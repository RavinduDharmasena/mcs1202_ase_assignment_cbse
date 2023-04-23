import { useContext, useState } from "react";
import { ShopContext } from "../ShopContext";
import { Button, Table } from "react-bootstrap";
import recipe from '../assets/recipe.jpg';

function CartTable(props) {
    const shopContext = useContext(ShopContext);

    const removeItem = (item, index) => {
        const existingItems = shopContext.items;
        existingItems.splice(index, 1);
        shopContext.setItems(existingItems);
        props.setShouldRender(true);

    }

    let total = 0;
    const cartItems = shopContext.items.map((item, i) => {
        total += item.unitPrice * item.itemAmount;
        return (
            <tr key={i}>
                <td><img src={recipe} width={70} /></td>
                <td>
                    {item.name}
                    <span style={{ display: 'block' }}>
                        <Button variant="link" className='cart-modal-remove-button' onClick={() => { removeItem(item, i); }}>
                            Remove
                        </Button>
                    </span>
                </td>
                <td>
                    {item.itemAmount}
                </td>
                <td>Rs. {item.unitPrice * item.itemAmount}.00</td>
            </tr>
        );
    })

    let otherExpenseRows = null

    if (props.otherExpenses) {
        otherExpenseRows = props.otherExpenses.map((otherExpense, i) => {
            total += otherExpense.price;
            return <tr key={i}><td colSpan={3}>{otherExpense.name}</td><td>Rs. {otherExpense.price}.00</td></tr>
        })
    }

    return (
        <Table striped bordered hover>
            <thead style={{ textAlign: "center" }}>
                <tr>
                    <th colSpan={2}>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {cartItems}
                {otherExpenseRows}
                <tr>
                    <th colSpan={3}>Total</th>
                    <th>Rs. {total}.00</th>
                </tr>
            </tbody>
        </Table>
    );
}

export default CartTable;