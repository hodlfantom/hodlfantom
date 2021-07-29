import tw from "twin.macro"
import Link from "next/link"
import { useRouter } from 'next/router'

import { navdata } from "./Nav.data"


function Nav() {
    const router = useRouter()


    return (
        <div tw="h-24  px-8 w-full flex items-center justify-evenly absolute top-0">
            <Link href="/">
                <div tw="flex items-center  h-20 text-4xl font-bold cursor-pointer">
                    <span tw="color[#45D95C]">HODL</span>
                    <span tw="text-white">ON</span>
                    <span tw="color[#A130F1]  lg:color[#0B193D]  ">FANTOM</span>
                </div>
            </Link>

            <div tw="lg:flex items-center justify-around text-2xl flex-1 font-bold hidden px-32">
                <Link href="/lotto">
                    <span css={[tw`text-white hover:color[#45d95c] cursor-pointer`, router.asPath === "/lotto" && tw`color[#0B193D]`]} > HodlLotto</span>
                </Link>
                <Link href="/stats">
                    <span css={[tw`text-white hover:color[#45d95c] cursor-pointer`, router.asPath === "/stats" && tw`color[#0B193D]`]}> HodlStats</span>
                </Link>
                <a href="https://ftmscan.com/token/0xb2da66c4a89d0f93935d1efdb9c9c8d1d3ba9343" target="_blank" >
                    <span tw="text-white hover:color[#45d95c] cursor-pointer"> View Contract</span>
                </a>
                <a href="https://hodlfantom.gitbook.io/hodl-on-fantom/" target="_blank" >
                    <span tw="text-white hover:color[#45d95c] cursor-pointer"> Gitbook</span>
                </a>
            </div>

            <div tw="hidden md:flex space-x-4 ">
                {navdata.map((item, index) =>
                    <div key={index} tw="color[#0B193D] w-12 h-12 rounded-full  flex items-center justify-center p-1 cursor-pointer hover:text-white" className="glass">
                        <a href={item.link} target="_blank">
                            {icons[index]}
                        </a>
                    </div>)}
            </div>

        </div>
    )
}

export default Nav


const icons = [
    <svg width="24" height="22" viewBox="0 0 24 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.95519 12.4262L7.62837 19.1157C7.81093 19.5786 8.41077 19.7025 8.76285 19.3504L12.0098 16.1035L17.9756 20.85C18.3733 21.1695 18.9666 20.9609 19.084 20.4653L23.4849 1.54439C23.6088 0.996716 23.0742 0.533796 22.5526 0.742435L0.72373 9.50527C0.143453 9.73999 0.143459 10.568 0.730257 10.7962L4.95519 12.4262ZM3.54688 9.92255L14.8003 5.40421L5.43767 11.0635L3.54688 10.3268C3.36432 10.2616 3.3578 10.0008 3.54688 9.92255ZM16.8998 5.82801L9.08885 12.9739L8.14997 16.5142L6.40914 12.1719L16.8998 5.82801ZM9.66913 16.3969L10.1451 14.6104L10.8753 15.1907L9.66913 16.3969ZM17.6756 18.7571L10.8362 13.3195L21.5355 3.52646L18.0212 18.6267C17.9886 18.7962 17.806 18.8614 17.6756 18.7571Z" />
    </svg>,
    <svg width="25" height="19" viewBox="0 0 25 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.0367 2.35044C23.1891 2.7286 22.2763 2.98288 21.3178 3.09372C22.2958 2.50693 23.0456 1.58109 23.3977 0.472694C22.4849 1.01385 21.4678 1.41157 20.392 1.62021C19.5314 0.700894 18.2991 0.127136 16.9364 0.127136C13.8785 0.127136 11.6357 2.97636 12.3268 5.93642C8.39525 5.74083 4.90707 3.85656 2.57293 0.994293C1.33413 3.1198 1.92745 5.90382 4.03992 7.31214C3.26404 7.28606 2.5338 7.07742 1.89484 6.71882C1.84268 8.90953 3.414 10.9633 5.68947 11.4197C5.02443 11.6023 4.2942 11.6414 3.55092 11.498C4.15076 13.3757 5.89811 14.7449 7.97146 14.784C5.98287 16.3423 3.47268 17.0399 0.962494 16.7465C3.0554 18.0896 5.54603 18.872 8.21922 18.872C17.0081 18.872 21.9698 11.4523 21.6699 4.79543C22.6023 4.13039 23.4042 3.30236 24.0367 2.35044Z" />
    </svg>,
    <svg width="27" height="19" viewBox="0 0 27 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.0807 2.65037C19.9446 0.303183 16.965 0.368383 16.965 0.368383L16.6585 0.71394C20.3553 1.84841 22.0766 3.47841 22.0766 3.47841C19.8142 2.23962 17.5974 1.62674 15.5306 1.39202C13.9658 1.21598 12.4597 1.26162 11.1361 1.43766C11.0057 1.43766 10.8949 1.45722 10.7645 1.4833C10.0016 1.5485 8.15648 1.82886 5.82233 2.85249C5.02037 3.22413 4.5379 3.48493 4.5379 3.48493C4.5379 3.48493 6.34393 1.76366 10.2624 0.635704L10.0473 0.374904C10.0473 0.374904 7.06765 0.309705 3.93154 2.65689C3.93154 2.65689 0.795441 8.33578 0.795441 15.3382C0.795441 15.3382 2.62103 18.4939 7.43276 18.6439C7.43276 18.6439 8.23473 17.6659 8.89325 16.8378C6.12878 16.0098 5.08557 14.269 5.08557 14.269C5.08557 14.269 5.30074 14.4189 5.69194 14.6406C5.7115 14.6602 5.73757 14.6862 5.77669 14.7058C5.84189 14.7514 5.9071 14.771 5.9723 14.8166C6.51345 15.1231 7.06113 15.3578 7.56317 15.5534C8.45641 15.8989 9.51916 16.251 10.7645 16.4857C12.3945 16.7922 14.3113 16.8965 16.3977 16.5053C17.4214 16.3293 18.4645 16.0293 19.5534 15.5729C20.3162 15.2926 21.1638 14.8753 22.057 14.2885C22.057 14.2885 20.9682 16.075 18.119 16.8769C18.771 17.705 19.5534 18.6373 19.5534 18.6373C24.3586 18.4874 26.2103 15.3317 26.2103 15.3317C26.2103 8.32927 23.0807 2.65037 23.0807 2.65037ZM9.4344 13.3105C8.21516 13.3105 7.21761 12.2217 7.21761 10.8981C7.21761 9.57458 8.1956 8.48574 9.4344 8.48574C10.6732 8.48574 11.6773 9.57458 11.6512 10.8981C11.6577 12.2217 10.6797 13.3105 9.4344 13.3105ZM17.3757 13.3105C16.1565 13.3105 15.1589 12.2217 15.1589 10.8981C15.1589 9.57458 16.1369 8.48574 17.3757 8.48574C18.6145 8.48574 19.5925 9.57458 19.5925 10.8981C19.5925 12.2217 18.621 13.3105 17.3757 13.3105Z" />
    </svg>,
    <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.16788 3.76933C3.19396 3.53461 3.10269 3.30641 2.92665 3.14341L1.1467 0.998344V0.678867H6.67563L10.9527 10.0546L14.7082 0.678867H19.9829V0.998344L18.4572 2.45882C18.3268 2.55662 18.2616 2.72614 18.2877 2.88914V13.621C18.2616 13.784 18.3268 13.947 18.4572 14.0448L19.9438 15.5053V15.8248H12.4588V15.5053L13.9975 14.0122C14.1475 13.8622 14.1475 13.8166 14.1475 13.5884V4.91685L9.86389 15.7987H9.28362L4.29583 4.91685V12.2127C4.25672 12.5191 4.35452 12.8256 4.56968 13.0472L6.57131 15.4792V15.7987H0.885895V15.4792L2.88753 13.0472C3.10269 12.8256 3.20048 12.5126 3.14832 12.2127C3.16788 12.1997 3.16788 3.76933 3.16788 3.76933Z" />
    </svg>
]