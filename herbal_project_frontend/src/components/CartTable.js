import { useContext, useState } from "react";
import { ShopContext } from "../ShopContext";
import { Button, Table } from "react-bootstrap";
import recipe from '../assets/recipe.jpg';

function CartTable(props) {
    const shopContext = useContext(ShopContext);
    let total = 0;
    const cartItems = shopContext.items.map((item, i) => {
        total += item.unitPrice * item.itemAmount;
        return (
            <tr key={i}>
                <td><img src={recipe} width={70} /></td>
                <td>
                    {item.name}
                    <span style={{ display: 'block' }}>
                        <Button variant="link" className='cart-modal-remove-button'>
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
    
    if (props.otherExpenses && props.otherExpenses.length !== 0) {
        console.log(props.otherExpenses);
        const otherExpenses = Object.keys(props.otherExpenses);
        otherExpenseRows = otherExpenses.map((otherExpense,i) => {
            total += props.otherExpenses[otherExpense];
            const convertedStr = otherExpense.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
            return <tr key={i}><td colSpan={3}>{convertedStr}</td><td>Rs. {props.otherExpenses[otherExpense]}.00</td></tr>
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