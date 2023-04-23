import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../ShopContext";
import { Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import CartTable from "../components/CartTable";
import deliveryOption1 from '../assets/delivery_option_1.png';
import deliveryOption2 from '../assets/delivery_option_2.png';
import deliveryOption3 from '../assets/delivery_option_3.png';
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

function OrderSummaryPage() {
    const shopContext = useContext(ShopContext);
    const [orderInformation, setOrderInformation] = useState({ items: shopContext.items, orderStatus: "pending" })
    const [deliveryCharge, setDeliveryCharge] = useState(0)
    const [licenseAcceptance, setLicenseAcceptance] = useState(false);
    const navigate = useNavigate();

    const updateOrderAndDeliveryInformation = (event, expenseName, expenseAmount) => {
        setDeliveryCharge(expenseAmount);
        const orderInformationObj = orderInformation;
        orderInformationObj[event.target.name] = event.target.value
        setOrderInformation(orderInformation);
    }

    const toggleLicenseAcceptance = () => {
        setLicenseAcceptance(!licenseAcceptance);
    }

    const updateOrderInformation = (event) => {
        const existingOrderInformation = orderInformation;
        existingOrderInformation[event.target.name] = event.target.value;
        setOrderInformation(orderInformation);
    }

    const submitForm = () => {
        if(!licenseAcceptance){
            alert('Please accept license agreement');
            return;
        }

        let total = deliveryCharge;
        const items = orderInformation.items.map((item) => {
            total += item.totalItemPrice;
            return {
                itemId: item.id,
                itemAmount: item.itemAmount,
                totalItemPrice: item.totalItemPrice
            };
        });
        const orderInformationData = {
            order: orderInformation,
            items: items
        };
        orderInformationData.order.deliveryCharge = deliveryCharge;
        orderInformationData.items = items;

        axios.post(config.baseUrl + "orders", orderInformationData).then((response) => {
            if (response.status === 201) {
                window.location.href = "http://localhost:3001/pay?orderId=" + response.data.id + "&amount=" + total + "&currency=LKR&session=" + Math.random().toString(36).substring(2, 12) + "&successUrl=http%3A%2F%2Flocalhost%3A3000%2Forder_complete&failureUrl=http%3A%2F%2Flocalhost%3A3000%2Forder_failure";
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const otherExpenses = [{
        name: "Delivery Charge",
        price: deliveryCharge
    }]
    return (
        <div className="pb-1">
            <Header showCart={false} />
            <br />
            <div className="container">
                <CartTable ite otherExpenses={otherExpenses} />
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Delivery Options</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                id="deliveryOption1"
                                name="deliveryOption"
                                label="Not needed"
                                className="inline-block"
                                defaultChecked={(deliveryCharge === 0)}
                                onClick={(event) => { updateOrderAndDeliveryInformation(event, "delivery_charge", 0) }}
                                value={0}
                            />
                            <Form.Check
                                type="radio"
                                id="deliveryOption2"
                                name="deliveryOption"
                                label="Express Delivery"
                                className="inline-block ml-p5"
                                onClick={(event) => { updateOrderAndDeliveryInformation(event, "delivery_charge", 600) }}
                                value={1}
                            />
                            <Form.Check
                                type="radio"
                                id="deliveryOption3"
                                name="deliveryOption"
                                label="Fast Delivery"
                                className="inline-block ml-p5"
                                onClick={(event) => { updateOrderAndDeliveryInformation(event, "delivery_charge", 700) }}
                                value={2}
                            />
                            <Form.Check
                                type="radio"
                                id="deliveryOption4"
                                name="deliveryOption"
                                label="Your Delivery"
                                className="inline-block ml-p5"
                                onClick={(event) => { updateOrderAndDeliveryInformation(event, "delivery_charge", 800) }}
                                value={3}
                            />
                        </div>
                        <div>
                            <img src={deliveryOption1} className="inline-block" />
                            <img src={deliveryOption2} className="inline-block ml-p5" />
                            <img src={deliveryOption3} className="inline-block ml-p5" />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Name" onChange={(event) => { updateOrderInformation(event) }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                id="male"
                                name="gender"
                                label="Male"
                                className="inline-block"
                                onClick={(event) => { updateOrderInformation(event) }}
                                value="male"
                            />
                            <Form.Check
                                type="radio"
                                id="female"
                                name="gender"
                                label="Female"
                                className="inline-block ml-p5"
                                onClick={(event) => { updateOrderInformation(event) }}
                                value="female"
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Delivey Address</Form.Label>
                        <Form.Control as="textarea" name="deliveryAddress" placeholder="Delivery Address" rows={5} onChange={(event) => { updateOrderInformation(event) }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Delivery Address" onChange={(event) => { updateOrderInformation(event) }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" name="phoneNumber" placeholder="Phone Number" onChange={(event) => { updateOrderInformation(event) }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="number" name="zipCode" placeholder="Zip Code" onChange={(event) => { updateOrderInformation(event) }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" defaultChecked={licenseAcceptance} label="I accept the terms and conditions" onClick={() => toggleLicenseAcceptance()} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={submitForm}>
                        PAY NOW
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default OrderSummaryPage;