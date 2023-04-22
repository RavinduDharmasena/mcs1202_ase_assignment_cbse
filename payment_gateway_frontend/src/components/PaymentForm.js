import { useContext, useState } from 'react';
import { Col, Row, Button, Form, Card } from 'react-bootstrap';
import { PaymentContext } from '../PaymentContext';
import axios from 'axios';

function PaymentForm() {
    const [isDataEnetered, setIsDataEntered] = useState(false);
    const [formData, setFormData] = useState({
        creditCardNumber: '',
        cvc: '',
        expiryMonth: '',
        expiryYear: ''
    });
    const [otp, setOtp] = useState(null);
    const paymentContext = useContext(PaymentContext);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const sessionId = urlParams.get('sessionId');
    const orderId = urlParams.get('orderId');
    const amount = urlParams.get('amount');
    const successUrl = urlParams.get('successUrl');
    const failureUrl = urlParams.get('failureUrl');

    const submitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8081/payment/validate", formData).then((response) => {
            if (response.status !== 200) {
                throw new Error("Invalid card details");
            }
            else {
                setIsDataEntered(true);
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                localStorage.setItem("otp", otp);

                let now = new Date();
                let expirationTime = new Date(now.getTime() + 20000);
                localStorage.setItem("otpExpiry", expirationTime);
                return otp;
            }
        }).then((otp) => {
            // axios.post("http://localhost:8081/payment/sms", {
            //     phoneNumber: "+94711835190",
            //     message: "Your OTP is " + otp
            // }).then((result) => {
            //     console.log("sms sent");
            // })
            console.log(otp);
        }).catch((error) => {
            paymentContext.setPaymentStatus('paymentDataInvalid');
            setIsDataEntered(false);
            paymentContext.setShow(true);
            console.error(error);
        })
    }

    const checkOtp = () => {
        if (otp === localStorage.getItem("otp")) {
            if (new Date() > new Date(localStorage.getItem('otpExpiry'))) {
                let url = new URL(decodeURI(failureUrl));
                const paramsIterator = url.searchParams.entries();
                const hasParams = !paramsIterator.next().done;

                if (hasParams) {
                    url += "&";
                }
                else {
                    url += "?";
                }

                const timestamp = Date.now();
                const randomNumber = Math.floor(Math.random() * 1000000);
                const transactionId = `${timestamp}-${randomNumber}`;
                url += "transactionId=" + transactionId + "&status=declined&message=" + encodeURI("Transaction timeout is exceeded");
                new Promise((resolve, reject) => {
                    paymentContext.setShow(true);
                    paymentContext.setPaymentStatus('otpExpired');
                    setTimeout(() => {
                        resolve(true);
                    }, 3000)
                }).then(() => {
                    setTimeout(() => {
                        localStorage.removeItem("otp");
                        window.location.replace(url);
                    }, 3000);
                })
            }
            else {
                const showPaymentProcessDialog = () => {
                    return new Promise((resolve, reject) => {
                        paymentContext.setShow(true);
                        paymentContext.setPaymentStatus('processing');
                        setTimeout(() => {
                            resolve();
                        }, 3000);
                    });
                }

                const showPaymentSuccessDialog = () => {
                    return new Promise((resolve, reject) => {
                        paymentContext.setPaymentStatus('processSuccess');
                        setTimeout(() => {
                            resolve();
                        }, 5000);
                    });
                }

                const redirectToMerchant = () => {
                    localStorage.removeItem("otp");
                    window.location.replace(decodeURI(successUrl));
                }

                showPaymentProcessDialog().then(() => {
                    showPaymentSuccessDialog().then(() => {
                        redirectToMerchant();
                    })
                })
            }
        }
        else {
            paymentContext.setPaymentStatus('processFailed');
        }
        localStorage.removeItem("otp");
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
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Credit Card Number" name="creditCardNumber" disabled={isDataEnetered} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>CVC</Form.Label>
                <Form.Control type="number" placeholder="Enter CVC" name="cvc" disabled={isDataEnetered} onChange={handleInputChange} />
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
            <div style={{ marginBottom: "10px" }}>
                <Card>
                    <Card.Body>
                        <h5>Order Details</h5>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Order ID</td>
                                    <td>:</td>
                                    <td>{orderId}</td>
                                </tr>
                                <tr>
                                    <td>Amount</td>
                                    <td>:</td>
                                    <td>Rs.{amount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
            <Button variant="primary" type="button" onClick={(isDataEnetered) ? checkOtp : submitForm}>
                {(isDataEnetered) ? "Send the OTP" : "Submit"}
            </Button>
        </Form>
    );
}

export default PaymentForm;