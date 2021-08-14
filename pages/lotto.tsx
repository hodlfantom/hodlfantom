import Head from 'next/head'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState, useContext } from 'react'
import tw from 'twin.macro'
import Web3Modal from "web3modal"

import { HodlContext } from '../context/HodlContext'

import { checkApprove, approveHodl, getBalance, claimRebase } from '../utils/functions/hodlFunctions'
import { depositHodl, withdrawHodl, getDepositedAmount, getDepositTime, getTickets, getLottoStats, getWinners } from '../utils/functions/lottoFunctions'

import { hodlAbi, hodlContract } from '../utils/contracts/hodl'
import { fetchPrice } from '../utils/functions/fetchPrice'
import { lottoContract, lottoAbi } from '../utils/contracts/lotto'

import LottoCard from '../components/lottoCard'
import StatsCard from '../components/statsCard'
import Nav from '../components/Nav'
import Loading from '../components/Loading'
import WinnerCard from '../components/WinnerCard'


export default function Home() {
    const [hodlState, setHodlState] = useContext(HodlContext)
    const [buyAmount, setBuyAmount] = useState(0)

    const winners = []
    useEffect(() => {
        if (!window.ethereum) {
            window.alert('Install Metamask to continue.');
            setHodlState((current) => (
                {
                    ...current,
                    isError: true,
                    errorMessage: "Your browser is not supported. Please Install Metamask to continue."
                }))
            return;
        }
        window.ethereum.enable()
        loadWallet()

        window.ethereum.on('accountsChanged', () => {
            loadWallet();
        });

        window.ethereum.on('chainChanged', () => {
            document.location.reload();
        });
    }, [])

    async function loadWallet() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        let network = await provider.getNetwork();

        if (network.chainId != 250) {
            window.alert('Switch to Fantom Opera to continue');

            setHodlState((current) => (
                {
                    ...current,
                    isFantom: false,
                    isError: true,
                    errorMessage: "You're on the wrong network. Switch to Metamask to Fantom Opera to continue"
                }))
            return;
        }
        let price = await fetchPrice(setHodlState)
        const hodl = new ethers.Contract(hodlContract, hodlAbi, provider)
        const hodlSigner = new ethers.Contract(hodlContract, hodlAbi, signer)
        const lotto = new ethers.Contract(lottoContract, lottoAbi, provider)
        const lottoSigner = new ethers.Contract(lottoContract, lottoAbi, signer)
        await checkApprove(setHodlState, hodl)
        await getBalance(setHodlState, hodl)
        await getLottoStats(setHodlState, lotto, hodl, price)
        if (hodlState.winnersList.length == 0) {
            // console.log("caled winners")
            await getWinners(setHodlState, lotto)
        }
 
        setHodlState((current) => (
            {
                ...current,
                provider,
                signer,
                address,
                isFantom: true,
                isError: false,
                errorMessage: "",
                contracts: {
                    hodl, hodlSigner, lotto, lottoSigner
                }
            }))
    }



    async function handleWithdraw() {
        withdrawHodl(setHodlState, hodlState.contracts.lottoSigner)
    }
    async function handleApprove() {
        await approveHodl(setHodlState, hodlState.contracts.hodlSigner)
        setHodlState((current) => (
            {
                ...current,
                isApproved: true
            }))
    }
    async function handleBuyTickets() {
        await depositHodl(1000 * buyAmount, setHodlState, hodlState.contracts.lottoSigner)
        await getLottoStats(setHodlState, hodlState.contracts.lotto, hodlState.contracts.hodl, hodlState.hodlPrice.usd)
    }

    function increment() {
        setBuyAmount(buyAmount + 1)
    }
    function decrement() {
        if (buyAmount > 0) {
            setBuyAmount(buyAmount - 1)
        }
    }
    function handleInput(event) {
        let val = parseInt(event.target.value.replace(/\D/, buyAmount))
        setBuyAmount(val)
        if (isNaN(val) || isNaN(event.target.value)) {
            setBuyAmount(0)
        }

    }


    return (
        <div tw="min-h-screen h-full w-full relative bg-cover background-image[url('/assets/images/bg_mountain.jpg')] font-bold">
            <Head>
                <title>HODLOnFantom | HODLStats</title>
                <meta name="description" content="HodlLotto- A lossless raffle " />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="" tw=" flex flex-col w-full items-center justify-center min-h-screen ">
                <div tw=" h-full w-full z-10 md:p-8 p-4 relative">

                    <div className="glass" tw=" bg-white bg-opacity-40  w-full h-full flex flex-col z-index[1] relative">
                        <Nav />
                        <div tw="z-index[-2] h-full absolute inset-0 filter blur-md bg-cover background-image[url('/assets/images/bg_mountain.jpg')] bg-opacity-20"></div>

                        <div tw="flex items-center justify-center h-full pt-24">
                            {
                                hodlState.isLoading ? <div tw="flex w-full height[80vh] lg:height[80vh]  text-5xl font-bold items-center justify-center px-4 py-12">
                                    <Loading />
                                </div> :
                                    <div tw="flex flex-col lg:(flex-row space-y-0)  w-full h-full ">
                                        {/* hodlLotto */}




                                        <div tw="flex flex-col items-center px-6 py-8 flex-1 ">
                                            <h2 tw="text-2xl lg:text-6xl font-bold text-white tracking-wider mb-12">
                                                HODL
                                                <span tw="color[#45D95C]">Lotto</span>
                                            </h2>

                                            <div tw="grid grid-cols-1 lg:grid-cols-3  gap-8 mb-4">
                                                <LottoCard val={(hodlState.lottoStats.slots).toFixed()} tittle="Slots" desc="1 Slot = 1 Ticket/4hr. You lose Slots when you withdraw HODL." />
                                                <LottoCard val={hodlState.lottoStats.tickets} tittle="Tickets" desc="Tickets never expire. New tickets only given by having Slots" />
                                                <LottoCard val={"$" + hodlState.lottoStats.price} tittle="Reward" desc="Calculated rewards based on HODL price and total HODL currently in Lotto" />
                                                <LottoCard val={hodlState.lottoStats.remainingTime} tittle="Left" desc="Time until next Drawing where winner is picked" />
                                                <LottoCard val={hodlState.lottoStats.totalTickets} tittle="Total Tickets" desc="Total tickets held by everyone currently playing lotto" />
                                                <LottoCard val={((hodlState.lottoStats.tickets / hodlState.lottoStats.totalTickets) * 100).toFixed(2) + "%"} tittle="Wining Chance" desc="Chance of winning based on your tickets vs total tickets" />
                                            </div>
                                            {/* Buy Tickets  */}
                                            <div tw=" flex items-center w-full h-full  justify-center">
                                                <div className="glass" tw="flex flex-col lg:flex-row items-end px-4">
                                                    <div tw="flex flex-col lg:px-8 py-4">
                                                        <div tw="flex items-center lg:space-x-4">
                                                            <input tw="appearance-none mb-4 mr-8 outline-none bg-transparent text-7xl text-center font-bold color[#45D95C] w-40 border-b-2 border-color[#0B193D]" type="text" value={buyAmount} onChange={event => handleInput(event)} />
                                                            {/* <span tw="text-9xl text-center font-bold color[#45D95C] w-36">{buyAmount}</span> */}
                                                            <div tw="flex flex-col space-y-2">
                                                                < div tw="w-10 h-10  color[#0B193D] select-none bg-white hover:(text-white background-color[#0B193D]) text-4xl flex items-center justify-center mb-2 font-bold p-2 rounded-lg cursor-pointer" onClick={() => increment()}>
                                                                    +
                                                                </div>
                                                                <div tw="w-10 h-10 color[#0B193D] select-none bg-white hover:(text-white background-color[#0B193D]) text-4xl flex items-center justify-center font-bold p-2 rounded-lg cursor-pointer" onClick={() => decrement()}>
                                                                    -
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div tw="flex text-white text-lg justify-between">
                                                            <span>Cost</span>
                                                            <span>0.001 HODL</span>
                                                        </div>
                                                        <div tw="flex text-white text-lg justify-between">
                                                            <span>You Pay</span>
                                                            <span>{(buyAmount * 0.001).toFixed(3)} HODL</span>
                                                        </div>
                                                    </div>
                                                    <div tw="py-4 space-y-4">
                                                        {hodlState.lottoStats.tickets > 0 &&
                                                            <div tw="text-3xl font-bold color[#0B193D] select-none background-color[#45D95C] hover:(background-color[#0B193D]  color[#45D95C]) rounded-lg px-8 py-4 text-center cursor-pointer min-width[250px]" onClick={handleWithdraw}>Withdraw</div>
                                                        }
                                                        {hodlState.isApproved ?
                                                            <div tw="text-3xl font-bold color[#0B193D] select-none background-color[#45D95C] hover:(background-color[#0B193D]  color[#45D95C]) rounded-lg px-8 py-4 text-center cursor-pointer min-width[250px]" onClick={handleBuyTickets}>Buy Slots</div> :
                                                            <div tw="text-3xl font-bold color[#0B193D] select-none background-color[#45D95C] hover:(background-color[#0B193D]  color[#45D95C]) rounded-lg px-8 py-4 text-center cursor-pointer min-width[250px]" onClick={handleApprove}>Approve</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div>

                                            </div>
                                        </div>

                                        <div tw=" p-8 lg:w-1/3">
                                            <div className="glass" tw="w-full h-full flex flex-col items-center px-4 py-12">
                                                <h2 tw="text-4xl color[#0B193D] text-center">Recent Winners </h2>
                                                <div tw="flex flex-col-reverse w-full  items-center justify-evenly h-full">
                                                    {hodlState.winnersList.length > 0 && hodlState.winnersList.map((winner, index) =>

                                                        <WinnerCard key={index} address={winner.addr} amount={winner.amount} price={hodlState.hodlPrice.usd} />

                                                    )}
                                                </div>
                                                <span tw="w-full text-gray-300">* Displaying Latest winners first</span>
                                            </div>
                                        </div>

                                    </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
