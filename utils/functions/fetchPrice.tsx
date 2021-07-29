import { hodlContract } from "../contracts/hodl"
import { BigNumber } from "@ethersproject/bignumber"

export const fetchPrice = async (setAppState) => {
    let res = await fetch(`https://api.paintswap.finance/tokens/` + hodlContract)
    let results = await res.json()
    setAppState((current) => (
        {
            ...current,
            hodlPrice: {
                usd: results.token.price,
                ftm: results.token.price_FTM
            }
        }))
    return results.token.price
}