import { BigNumber, ethers } from 'ethers'
import { hodlAbi, hodlContract } from '../contracts/hodl'
import { lottoContract, lottoAbi } from '../contracts/lotto'

export const depositHodl = async function (amount, setAppState, contract) {
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        try {
            let transaction = await contract.deposit(amount)
            let tx = await transaction.wait()
        } catch (error) {
            // console.log(error)
            window.alert("You either don't have enough hodl or you're trying to spend more than you approved");
        }
    }
}

export const withdrawHodl = async function (setAppState, contract) {
    if (typeof window.ethereum !== 'undefined') {
        try {
            let transaction = await contract.withdraw()
            let tx = await transaction.wait()
            console.log(transaction, tx)
        } catch (error) {
            window.alert("You can't withdraw yet! Please try again later");
        }
    }
}

export const getDepositedAmount = async function (setAppState, contract) {
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let balance = await contract.balance(account)
        return BigNumber.from(balance).toNumber() / 1e6
    }
}

const calculateRemainingTime = async function (contract) {
    // (lastDrawing - drawingTime) - current time
    let lastDrawing = await contract.lastDrawing()
    let drawingTime = await contract.drawingTime()

    let draw = (BigNumber.from(lastDrawing).toNumber() + BigNumber.from(drawingTime).toNumber())
    let now = Date.now()
    const drawTime = new Date(draw * 1000)
    const presentTime = new Date(now)

    let hour = drawTime.getHours() - presentTime.getHours()
    let minutes = drawTime.getMinutes() - presentTime.getMinutes()


    if (minutes < 0) {
        minutes = minutes + 60
        hour -= 1
    }
    if (hour < 0) { hour = hour + 24 }
    if (hour > 23) { hour = hour - 24 }

    return hour + "h" + minutes + "m"

}

export const getLottoStats = async function (setAppState, contract, hodlContract, hodlPrice) {

    // Get the lotto related stats by calling the lotto contract read functions
    let depositedAmount = await getDepositedAmount(setAppState, contract)
    let depositTime = await getDepositTime(contract)
    let tickets = await getTickets(contract)
    let totalTickets = await getTotalTickets(contract)
    let remainingTime = await calculateRemainingTime(contract)

    //fetch the hodl balance, daily rebase of the lotto contract and claculate the rewards
    const balanceOf = await hodlContract.balanceOf(lottoContract);
    let userBalance = BigNumber.from(balanceOf).toNumber() / 1e6
    let reward = "0"
    if (userBalance == 0) {
        window.alert("Oops!! looks like nobody has bought any tickets yet")
    } else {

        const toClaim = await hodlContract.tokensToClaim(lottoContract);
        let userTotalBalance = BigNumber.from(toClaim).toNumber() / 1e6
        const supply = await hodlContract.totalSupply();
        let totalSupply = BigNumber.from(supply).toNumber() / 1e6

        let dailyRebase = (userTotalBalance / totalSupply) * 24

        // Winning amount is 75% of the daily rebase of the contract
        reward = (dailyRebase * hodlPrice * 0.74).toFixed(2)
    }





    setAppState((current) => (
        {
            ...current,
            lottoStats: {
                price: reward, slots: depositedAmount / 0.001, depositTime, tickets, totalTickets, remainingTime
            },
            isLoading: false
        }))
}

export const getTickets = async function (contract) {
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let balance = await contract.tickets(account)
        return BigNumber.from(balance).toNumber()
    }
}
export const getTotalTickets = async function (contract) {
    if (typeof window.ethereum !== 'undefined') {
        let totalTickets = await contract.totalTickets()
        return BigNumber.from(totalTickets).toNumber()
    }
}

export const getDepositTime = async function (contract) {
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let time = await contract.depositTime(account)
        var test = new Date(BigNumber.from(time).toNumber() * 1000);
        return test
    }
}


