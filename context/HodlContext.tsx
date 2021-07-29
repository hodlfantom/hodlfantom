import { useState, createContext } from "react";

export const HodlContext = createContext(null)

export const HodlProvider = props => {
    const [hodlState, setHodlState] = useState({
        fetching: false,
        address: "",
        isError: true,
        isLoading: true,
        errorMessage: "",
        provider: null,
        connected: false,
        sample: "tello",
        isFantom: true,
        signer: null,
        isApproved: false,
        contracts: null,
        hodlStats: {
            userBalance: 0,
            userTotalBalance: 0,
            totalSupply: 0,
            userPercentage: 0,
            dailyRebase: 0,
            hourlyRebase: 0,
            pendingRebase: 0
        },
        hodlPrice: {
            usd: 0, ftm: 0,
        },
        lottoStats: {
            price: "0", depositTime: Date.now(), tickets: 0, slots: 0, totalTickets: 0, remainingTime: "00h00m"
        },
    })



    return (
        <HodlContext.Provider value={[hodlState, setHodlState]} >
            {props.children}
        </HodlContext.Provider>
    )
}