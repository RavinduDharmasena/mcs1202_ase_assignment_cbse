import axios from "axios";
import Header from "../components/Header";
import { Card, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import "../components/utilities.css";
import './OrderSuccessPage.css';
import { Link } from "react-router-dom";

function OrderSuccessPage() {
    const [orderDetails, setOrderDetails] = useState(null)
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        axios.get("http://localhost:8080/orders/" + urlParams.get("orderId")).then((response) => {
            setOrderDetails(response.data);
        })
    }, [])

    let total = 0;
    let status = null;
    let orderedItems = null;
    let deliveryCharge = 0;
    let commission = 0;

    if(orderDetails){    
        deliveryCharge = orderDetails.order.deliveryCharge;
        commission = orderDetails.order.commission;
        total = orderDetails.order.commission + orderDetails.order.deliveryCharge
        status = urlParams.get("status").charAt(0).toUpperCase() + urlParams.get("status").slice(1);
        orderedItems = orderDetails.orderedItems.map((orderedItem, i) => {
            total += orderedItem.totalItemPrice;
            return (
                <ListGroup.Item key={i}>
                    <div className="w-25p inline-block">
                        {orderedItem.item.name}
                    </div>
                    <div className="w-25p inline-block">
                        {"Rs." + orderedItem.item.unitPrice.toFixed(2)}
                    </div>
                    <div className="w-25p inline-block">
                        {orderedItem.itemAmount}
                    </div>
                    <div className="w-25p inline-block">
                        {"Rs." + orderedItem.totalItemPrice.toFixed(2)}
                    </div>
                </ListGroup.Item>
            )
        });
    }

    return (
        <>
            <Header showCart={false} />
            <div className="center">
                <Link to="/"><img src={logo} width={200} /></Link>
            </div>
            <h1 className="uppercase center m-1">Order Receipt</h1>
            <div className="m1 p1">
                <Card className="receipt-card">
                    <Card.Header className="uppercase center"><b>Details</b></Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <div className="w-55p inline-block">
                                Order ID
                            </div>
                            <div className="w-45p inline-block">
                                {urlParams.get("orderId")}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="w-55p inline-block">
                                Transaction ID
                            </div>
                            <div className="w-45p inline-block">
                                {urlParams.get("transactionId")}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="w-55p inline-block">
                                Transaction Status
                            </div>
                            <div className="w-45p inline-block">
                                {status}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="w-55p inline-block">
                                Error
                            </div>
                            <div className="w-45p inline-block">
                                {decodeURI(urlParams.get("message"))}
                            </div>
                        </ListGroup.Item>
                        <Card.Header className="uppercase center"><b>Ordered Items</b></Card.Header>
                        <ListGroup.Item>
                            <div className="w-25p inline-block">
                                <b>Item Name</b>
                            </div>
                            <div className="w-25p inline-block">
                                <b>Unit Price</b>
                            </div>
                            <div className="w-25p inline-block">
                                <b>Quantity</b>
                            </div>
                            <div className="w-25p inline-block">
                                <b>Total Price</b>
                            </div>
                        </ListGroup.Item>
                        {orderedItems}
                        <Card.Header className="uppercase center"><b>Other Expenses</b></Card.Header>
                        <ListGroup.Item>
                            <div className="w-75p inline-block">
                                Delivery Charge
                            </div>
                            <div className="w-25p inline-block">
                                {"Rs." + deliveryCharge.toFixed(2)}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="w-75p inline-block">
                                Service Charge
                            </div>
                            <div className="w-25p inline-block">
                                {"Rs." + commission.toFixed(2)}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="w-75p inline-block">
                                <b>Total</b>
                            </div>
                            <div className="w-25p inline-block">
                                <b>{"Rs." + total.toFixed(2)}</b>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}

export default OrderSuccessPage;