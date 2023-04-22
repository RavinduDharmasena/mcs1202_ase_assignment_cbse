import { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

function OrderFailurePage() {
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        axios.get("http://localhost:8080/orders/" + urlParams.get("orderId")).then((response) => {
            console.log(response.data);
        })
    }, [])

    let status = urlParams.get("status").charAt(0).toUpperCase() + urlParams.get("status").slice(1);
    return (
        <>
            <Header showCart={false} />
            <h1 style={{ textTransform: "uppercase", textAlign: "center", margin: "1rem" }}>Transaction has been failed</h1>
            <div style={{
                height: "100%",
                padding: "1rem",
                margin: "1rem",
                borderRadius: ".5rem"
            }}>
                <Card style={{ width: '70%',margin:"auto" }}>
                    <Card.Header style={{textTransform:"uppercase",textAlign:"center"}}><b>Details</b></Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <div style={{ width: "35%", display: "inline-block" }}>
                                Order ID
                            </div>
                            <div style={{ width: "65%", display: "inline-block" }}>
                                {urlParams.get("orderId")}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{ width: "35%", display: "inline-block" }}>
                                Transaction ID
                            </div>
                            <div style={{ width: "65%", display: "inline-block" }}>
                                {urlParams.get("transactionId")}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{ width: "35%", display: "inline-block" }}>
                                Transaction Status
                            </div>
                            <div style={{ width: "65%", display: "inline-block" }}>
                                {status}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{ width: "35%", display: "inline-block" }}>
                                Error
                            </div>
                            <div style={{ width: "65%", display: "inline-block" }}>
                                {decodeURI(urlParams.get("message"))}
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}

export default OrderFailurePage;