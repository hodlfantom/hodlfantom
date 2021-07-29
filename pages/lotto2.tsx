import Head from 'next/head'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import Web3Modal from "web3modal"

import { checkApprove, approveHodl, getBalance, claimRebase } from '../utils/functions/hodlFunctions'
import { depositHodl, withdrawHodl, getDepositedAmount, getDepositTime, getTickets, getLottoStats } from '../utils/functions/lottoFunctions'

import { hodlAbi, hodlContract } from '../utils/contracts/hodl'
import { fetchPrice } from '../utils/functions/fetchPrice'
import { lottoContract, lottoAbi } from '../utils/contracts/lotto'

import LottoCard from '../components/lottoCard'
import StatsCard from '../components/statsCard'
import Loading from '../components/Loading'


export default function Home() {

    const [buyAmount, setBuyAmount] = useState(0)
    const [appState, setAppState] = useState(
        {
            fetching: false,
            address: "",
            isError: true,
            isLoading: true,
            errorMessage: "",
            provider: null,
            connected: false,
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
        }
    )

    useEffect(() => {
        if (!window.ethereum) {
            window.alert('Install Metamask to continue.');
            setAppState((current) => (
                {
                    ...current,
                    isError: true,
                    errorMessage: "Your browser is not supported. Please Install Metamask to continue."
                }))
            return;
        }
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

            setAppState((current) => (
                {
                    ...current,
                    isFantom: false,
                    isError: true,
                    errorMessage: "You're on the wrong network. Switch to Metamask to Fantom Opera to continue"
                }))
            return;
        }
        let price = await fetchPrice(setAppState)
        const hodl = new ethers.Contract(hodlContract, hodlAbi, provider)
        const hodlSigner = new ethers.Contract(hodlContract, hodlAbi, signer)
        const lotto = new ethers.Contract(lottoContract, lottoAbi, provider)
        const lottoSigner = new ethers.Contract(lottoContract, lottoAbi, signer)
        await checkApprove(setAppState, hodl)
        await getBalance(setAppState, hodl)
        await getLottoStats(setAppState, lotto, hodl, price)
        setAppState((current) => (
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
        claimRebase(setAppState, appState.contracts.hodlSigner)
    }
    function handleApprove() {
        approveHodl(setAppState, appState.contracts.hodlSigner)
    }
    function handleBuyTickets() {
        depositHodl(1000 * buyAmount, setAppState, appState.contracts.lottoSigner)
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
        let val = parseInt(event.target.value.replace(/\D/, '0'))
        console.log(val)
        setBuyAmount(val)
        if (isNaN(val) || isNaN(event.target.value)) {
            setBuyAmount(0)
        }

    }


    return (
        <div tw="min-h-screen h-full w-full bg-gray-400 relative ">
            <Head>
                <title>HODLOnFantom</title>
                <meta name="description" content="HodlOnFantom- The first rebase token on fantom" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div tw="lg:h-screen flex h-full w-full items-center justify-evenly   inset-0 ">
                {/* backgrond colors */}
                <Loading />
            </div>


        </div >
    )
}
