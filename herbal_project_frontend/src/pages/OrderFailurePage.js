import Header from "../components/Header";
import { Card, ListGroup } from "react-bootstrap";
import logo from "../assets/logo.jpg";
import "../components/utilities.css";
import './OrderSuccessPage.css';
import { Link } from "react-router-dom";

function OrderFailurePage() {
    const urlParams = new URLSearchParams(window.location.search);

    let status = urlParams.get("status").charAt(0).toUpperCase() + urlParams.get("status").slice(1);
    return (
        <>
            <Header showCart={false} />
            <div className="center">
                <Link to="/"><img src={logo} width={200} /></Link>
            </div>
            <h1  className="uppercase center m-1">Transaction has been failed</h1>
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
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}

export default OrderFailurePage;