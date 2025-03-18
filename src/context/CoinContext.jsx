import { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$",
    });

    const fetchAllCoin = async () => {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "x-cg-demo-api-key": "CG-XFZCTx53hxRvGt4JXXHktfDb",
                    },
                }
            );
            const data = await response.json(); // ใช้ await res.json()
            setAllCoin(data); // ใช้ setAllCoin(data) แทน setAllCoin(res.data)
        } catch (error) {
            console.error("Error fetching coin data:", error);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    return (
        <CoinContext.Provider value={{ allCoin, currency, setCurrency }}>
            {children}
        </CoinContext.Provider>
    );
};
