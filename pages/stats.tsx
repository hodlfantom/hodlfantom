import Head from 'next/head'
import Nav from '../components/Nav'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState, useContext } from 'react'
import tw from 'twin.macro'
import Web3Modal from "web3modal"

import { HodlContext } from '../context/HodlContext'

import { checkApprove, approveHodl, getBalance, claimRebase } from '../utils/functions/hodlFunctions'
import { depositHodl, withdrawHodl, getDepositedAmount, getDepositTime, getTickets, getLottoStats } from '../utils/functions/lottoFunctions'

import { hodlAbi, hodlContract } from '../utils/contracts/hodl'
import { fetchPrice } from '../utils/functions/fetchPrice'
import { lottoContract, lottoAbi } from '../utils/contracts/lotto'
import StatsCard from '../components/statsCard'
import Loading from '../components/Loading'

function Stats() {
    const [hodlState, setHodlState] = useContext(HodlContext)
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

    function handleRebase() {
        claimRebase(setHodlState, hodlState.contracts.hodlSigner)
    }

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    return (
        <div tw="min-h-screen md:h-screen w-full relative bg-cover background-image[url('/assets/images/bg_mountain.jpg')] font-bold">
            <Head>
                <title>HODLOnFantom | HODLStats</title>
                <meta name="description" content="HodlStats- All your Hodl stats at one place" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="" tw=" flex flex-col h-full w-full items-center justify-center ">
                <div tw=" h-full w-full z-10 md:p-8 p-4 relative">

                    <div className="glass" tw=" bg-white bg-opacity-40  w-full h-full flex flex-col z-index[1] relative">
                        <Nav />
                        <div tw="z-index[-2] h-full absolute inset-0 filter blur-md bg-cover background-image[url('/assets/images/bg_mountain.jpg')] bg-opacity-20"></div>

                        <div tw="flex items-center justify-center h-full pt-24">
                            {hodlState.isLoading ? <div tw="flex w-full height[80vh] lg:h-full  text-5xl font-bold items-center justify-center px-4 py-12" >
                                <Loading />
                            </div> :
                                <div tw="flex flex-col items-center justify-between px-4 py-8 space-y-6 lg:(space-y-8) flex-1 ">
                                    <h2 tw="text-3xl lg:text-6xl font-bold text-white tracking-wider ">
                                        HODL
                                        <span tw="color[#0B193D]">Stats</span>
                                    </h2>
                                    <div tw="flex flex-col space-x-0 space-y-4  lg:(flex-row space-x-4 space-y-0)">
                                        <div tw="p-8 flex flex-col items-center" className="glass">
                                            <span tw="text-2xl lg:text-5xl font-bold text-white mb-8">HODL Price</span>
                                            <div tw="flex space-x-4">
                                                <h3 tw="text-3xl font-bold color[#0B193D]">${parseInt(hodlState.hodlPrice.usd)} <span tw="text-xl"> per HODL </span></h3>
                                                <h3 tw="text-3xl font-bold color[#0B193D]">{parseInt(hodlState.hodlPrice.ftm)} <span tw="text-xl">FTM per HODL</span></h3>
                                            </div>
                                        </div>

                                        <div tw="p-8 flex flex-col items-center" className="glass">
                                            <span tw="text-2xl lg:text-5xl font-bold text-white mb-8">Market Cap</span>
                                            <span tw="text-3xl  font-bold text-white mb-8 color[#0B193D]">{formatter.format((hodlState.hodlPrice.usd * hodlState.hodlStats.totalSupply))}</span>
                                        </div>
                                    </div>


                                    <div tw="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                        <StatsCard tittle="Balance" val={hodlState.hodlStats.userBalance} />
                                        <StatsCard tittle="Total Supply" val={hodlState.hodlStats.totalSupply} />
                                        <StatsCard tittle="Your Holding %" val={hodlState.hodlStats.userPercentage} />
                                        <StatsCard tittle="Hourly Rebase" val={hodlState.hodlStats.hourlyRebase} />
                                        <StatsCard tittle="Daily Rebase" val={hodlState.hodlStats.dailyRebase} />
                                        <StatsCard tittle="Pending Rebase" val={hodlState.hodlStats.pendingRebase} />

                                    </div>

                                    <div tw="text-3xl font-bold select-none hover:(color[#0B193D] bg-white) background-color[#0B193D]  color[#45D95C] rounded-lg px-8 py-4 cursor-pointer" onClick={handleRebase}>Claim Rebase</div>

                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Stats
