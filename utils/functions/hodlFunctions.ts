import { BigNumber, ethers } from 'ethers'
import { hodlAbi, hodlContract } from '../contracts/hodl'
import { lottoContract } from '../contracts/lotto'

export const claimRebase = async function (setAppState, contract) {
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let transaction = await contract.transfer(account, 0)
        let tx = await transaction.wait()
        console.log(transaction)
        const balance = await contract.allInfoFor(account);
        getBalance(setAppState, contract)

    }
}

export const getBalance = async function (setAppState, contract) {
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

        try {
            // const allInfo = await contract.balanceOf(account);
            const balanceOf = await contract.balanceOf(account);
            let userBalance = BigNumber.from(balanceOf).toNumber() / 1e6

            const supply = await contract.totalSupply();
            let totalSupply = BigNumber.from(supply).toNumber() / 1e6

            let userTotalBalance = 0
            if (userBalance > 0) {
                const toClaim = await contract.tokensToClaim(account);
                userTotalBalance = BigNumber.from(toClaim).toNumber() / 1e6
            }

            let userPercentage = (userTotalBalance / totalSupply) * 100
            let hourlyRebase = (userTotalBalance / totalSupply) * 1
            let dailyRebase = (userTotalBalance / totalSupply) * 24
            let pendingRebase = Math.abs(userTotalBalance - userBalance)
            if (userBalance > userTotalBalance) {
                pendingRebase = 0
            }
            setAppState((current) => (
                {
                    ...current,
                    hodlStats: {
                        userBalance,
                        userTotalBalance,
                        totalSupply,
                        userPercentage,
                        dailyRebase,
                        hourlyRebase,
                        pendingRebase
                    },
                    isLoading: false
                }))
        } catch (error) {
            console.log(error)
            window.alert('Go buy some hodl before you participate in the lotto');
            window.open("https://exchange.paintswap.finance/#/swap?outputCurrency=0xb2da66c4a89d0f93935d1efdb9c9c8d1d3ba9343");
            const sup = await contract.totalSupply();
            let supply = (BigNumber.from(sup).toNumber() / 1e6)
            setAppState((current) => (
                {
                    ...current,
                    hodlStats: {
                        ...current.hodlStats,
                        totalSupply: supply
                    },
                    isLoading: false
                }))

        }

    }
}

export const approveHodl = async function (setAppState, contract) {
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let transaction = await contract.approve(lottoContract, 1000000)
        let tx = await transaction.wait()
        console.log(transaction)
        checkApprove(setAppState, contract)

    }
}


export const checkApprove = async function (setAppState, contract) {
    let approved = false
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let allowance = await contract.allowance(account, lottoContract)
        if (BigNumber.from(allowance).toNumber() > 0) {
            approved = true
        }
        setAppState((current) => (
            {
                ...current,
                isApproved: approved
            }))
    }
}