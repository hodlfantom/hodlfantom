import tw from "twin.macro"

function StatsCard({ val, tittle }) {
    return (
        <div tw="flex flex-col items-center p-4" className="glass">
            <span tw="text-5xl font-bold color[#0B193D]">{val.toString().substring(0, 7)}</span>
            <span tw="text-4xl font-bold text-white">HODL</span>
            <span tw="color[#0B193D]">{tittle}</span>
        </div>
    )
}

export default StatsCard
