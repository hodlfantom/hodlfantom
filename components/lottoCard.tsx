import tw from "twin.macro"

function LottoCard({ val, tittle, desc }) {
    return (
        <div>
            <div tw="flex flex-col py-4 px-6 items-center" className="glass">
                <span tw="text-5xl lg:text-6xl font-bold color[#45D95C]">{val}</span>
                <span tw="text-4xl font-bold text-white">{tittle}</span>
            </div>
        </div>
    )
}

export default LottoCard
