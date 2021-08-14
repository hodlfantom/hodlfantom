import tw from "twin.macro"

function WinnerCard({ address, amount, price }) {
    let add = address.substring(0, 4) + "..." + address.substring(address.length - 4)
    let url = "https://ftmscan.com/address/" + address
    let amt = amount.toString().substring(0, 5)
    let usd = price * amount
    // console.log(address.substring(1, 2))
    return (
        <div tw="flex items-center  text-2xl justify-between w-full">
            <a href={url} target="_blank">
                <span>{add}</span>
            </a>
            <div tw="flex items-center min-width[60px]">
                <span tw=" w-full">
                    ${parseInt(usd.toString())}
                </span>
            </div>
        </div>
    )
}

export default WinnerCard
