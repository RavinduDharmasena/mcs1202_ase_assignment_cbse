import { Button, Modal, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import PaymentForm from "../components/PaymentForm";
import { useState } from "react";
import { PaymentContext } from "../PaymentContext";

function PaymentPage() {
    const [show, setShow] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('processing');

    const handleClose = () => {
        setShow(false);
    }

    let paymentModalBodyText = null;
    if (paymentStatus === "processing") {
        paymentModalBodyText = <Modal.Body>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span style={{ marginLeft: "10px" }}>Hold for a Moment. We are processing your payment</span>
        </Modal.Body>
    }
    else if(paymentStatus === "processSuccess"){
        paymentModalBodyText = <Modal.Body>
            Payment is Approved. Please wait while we redirect to the merchant
        </Modal.Body>
    }
    else if(paymentStatus === "processFailed"){
        paymentModalBodyText = <Modal.Body>
            Payment is Failed. Please wait while we redirect to the merchant
        </Modal.Body>
    }

    return (
        <PaymentContext.Provider value={{ show: show, setShow: setShow, setPaymentStatus: setPaymentStatus }}>
            <Header />
            <div className="col-8" style={{ padding: '1rem', margin: 'auto' }}>
                <PaymentForm />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Payment Is Processing</Modal.Title>
                    </Modal.Header>
                    {paymentModalBodyText}
                    <Modal.Footer>
                        {/* <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        </PaymentContext.Provider>
    )
}

export default PaymentPage;