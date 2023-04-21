import { createContext } from "react";

export const PaymentContext = createContext(
    {
        show: false,
        setShow: '',
        paymentStatus:'processing',
        setPaymentStatus: ''
    }
);