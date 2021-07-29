import Head from 'next/head'
import tw from 'twin.macro'
import { HodlContext } from '../context/HodlContext'
import Nav from '../components/Nav'
import Link from 'next/link'




export default function Home() {


  return (
    <div tw="min-h-screen md:h-screen w-full relative bg-cover background-image[url('/assets/images/bg_mountain.jpg')]">
      <Head>
        <title>HODLOnFantom</title>
        <meta name="description" content="HodlOnFantom- The first rebase token on fantom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="" tw=" flex flex-col h-full w-full items-center justify-center text-6xl ">
        <div tw=" h-full w-full z-10 md:p-8 p-4 relative">

          <div className="glass" tw=" bg-white bg-opacity-40  w-full h-full flex flex-col z-index[1] relative">
            <Nav />
            {/* Main */}
            <div tw="z-index[-2] h-full absolute inset-0 filter blur-md bg-cover background-image[url('/assets/images/bg_mountain.jpg')] bg-opacity-20"></div>
            <div tw="flex flex-col md:flex-row w-full h-full pt-24 ">
              {/* left */}
              <div tw="flex[2]  flex flex-col items-start justify-center px-4 md:px-12 font-bold space-y-12">
                <div tw="flex flex-col space-y-8 text-center md:text-left">
                  <h1 tw="color[#0B193D] text-5xl  md:text-6xl">Earn HODL for Hodling HODL</h1>
                  <p tw="text-base pr-8 md:max-width[80%] text-white">HODL is a new token on the Fantom chain that rewards hodlers on the hour, every hour for simply having the coins in their wallet. Every hour a positive rebase occurs and the contract mints a new coin, increasing the total supply by 1. This newly minted coin is distributed to the existing holders according to their current percentage of the circulating supply. Every day there will only be 24 added to the total supply, and these coins are always split amongst the existing holders. </p>
                </div>

                <div tw="flex flex-col items-center w-full md:flex-row space-y-4 md:(space-x-4 space-y-0 items-start)">
                  <div tw="text-2xl font-bold color[#0B193D] select-none background-color[#45D95C] hover:(background-color[#0B193D]  color[#45D95C]) rounded-lg px-4 py-2 text-center cursor-pointer min-width[150px]">
                    <a href="https://exchange.paintswap.finance/#/swap?outputCurrency=0xb2da66c4a89d0f93935d1efdb9c9c8d1d3ba9343">
                      Buy HODL
                    </a>
                  </div>
                  <div tw="text-2xl font-bold background-color[#0B193D] select-none color[#45D95C] hover:(color[#0B193D]  background-color[#45D95C]) rounded-lg px-4 py-2 text-center cursor-pointer min-width[150px]">
                    <a href="https://charts.zoocoin.cash/?exchange=PaintSwap&pair=HODL-WFTM">
                      View Charts
                    </a>
                  </div>
                </div>
              </div>

              <div tw=" flex[3]  flex items-center justify-center py-8 px-4">

                <div tw="flex flex-col md:flex-row items-start justify-center">
                  <div className="glass" tw="flex items-center text-center flex-col max-w-xs space-y-4 py-4 px-2 rounded-2xl">
                    <img tw="w-40" src="/assets/images/statspepe.png" alt="" />
                    <h2 tw="text-3xl font-bold text-white">Already HODLing HODL?</h2>
                    <span tw="text-xl color[#0B193D]   font-bold">Visit HODLStats to claim your rewards and view some other interesting stats</span>
                    <div tw="text-2xl font-bold background-color[#0B193D] select-none color[#45D95C] hover:(color[#0B193D]  background-color[#45D95C]) rounded-lg px-4 py-2 text-center cursor-pointer min-width[150px]">
                      <Link href="/stats">
                        HodlStats
                      </Link>
                    </div>
                  </div>

                  <div className="glass" tw="flex items-center text-center flex-col max-w-xs space-y-6 py-4 rounded-2xl px-2 md:ml-24 margin-top[20%]">
                    <img tw="w-40" src="/assets/images/raffle.png" alt="" />
                    <h2 tw="text-3xl font-bold text-white">Try out the new HODLLotto</h2>
                    <span tw="text-xl color[#0B193D]  font-bold">Participate in the lossless HODLLotto and stand a chance to win extra HODL everday</span>
                    <div tw="text-2xl font-bold background-color[#0B193D] select-none color[#45D95C] hover:(color[#0B193D]  background-color[#45D95C]) rounded-lg px-4 py-2 text-center cursor-pointer min-width[150px]">
                      <Link href="/lotto">
                        HodlLotto
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div >
  )
}
