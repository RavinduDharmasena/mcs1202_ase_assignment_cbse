import { useContext, useState } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { PaymentContext } from '../PaymentContext';

function PaymentForm() {
    const [isDataEnetered, setIsDataEntered] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        cvv: '',
        expiryMonth: '',
        expiryYear: ''
    });
    const [otp, setOtp] = useState(null);
    const paymentContext = useContext(PaymentContext);

    const submitForm = (event) => {
        if (!otp) {
            setIsDataEntered(true);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            localStorage.setItem("otp", otp);
            console.log(localStorage.getItem("otp"));
        }
        else {
            if (otp === localStorage.getItem("otp")) {
                paymentContext.setShow(true);
                paymentContext.setPaymentStatus('processing');
                setTimeout(() => {
                    paymentContext.setPaymentStatus('processSuccess');
                }, 5000);
                setTimeout(() => {
                    paymentContext.setShow(false);
                }, 10000);
            }
            else {
                paymentContext.setPaymentStatus('processFailed');
            }
            localStorage.removeItem("otp");
        }
        event.preventDefault()
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const setOtpInput = (event) => {
        setOtp(event.target.value);
    }

    const otpField = (isDataEnetered) ? <Form.Group className="mb-3">
        <Form.Label>OTP</Form.Label>
        <Form.Control type="number" placeholder="Enter OTP" name="otp" onChange={setOtpInput} />
    </Form.Group> : null

    return (
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Card Number" name="cardNumber" disabled={isDataEnetered} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="number" placeholder="Enter CVV" name="cvv" disabled={isDataEnetered} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Row>
                    <Col>
                        <Form.Label>Expiry Month</Form.Label>
                        <Form.Select aria-label="Expiry month" defaultValue={""} name="expiryMonth" disabled={isDataEnetered} onChange={handleInputChange}>
                            <option disabled value={""}>Select Month</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Expiry Year</Form.Label>
                        <Form.Select aria-label="Expiry Year" defaultValue={""} name="expiryYear" disabled={isDataEnetered} onChange={handleInputChange}>
                            <option disabled value={""}>Select Year</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>
                            <option value="2034">2034</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form.Group>
            {otpField}
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default PaymentForm;