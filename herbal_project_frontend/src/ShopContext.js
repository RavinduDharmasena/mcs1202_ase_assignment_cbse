import { createContext } from "react";

export const ShopContext = createContext(
    {
        items: [],
        show: false,
        otherExpenses: {},
        setContextData: function(data) {
            localStorage.setItem("shoppingData",data);
        }
    }
);