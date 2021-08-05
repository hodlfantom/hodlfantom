import tw from "twin.macro"
import { useState } from "react"

function LottoCard({ val, tittle, desc }) {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <div tw="flex flex-col py-4 px-6 items-center justify-center relative w-80 h-36" className="glass">
                {isOpen ?
                    <div tw="text-white text-lg text-center">
                        <span>{desc}</span>
                    </div> :
                    <div tw="flex flex-col items-center">
                        <span tw="text-3xl lg:text-4xl font-bold color[#45D95C]">{val}</span>
                        <span tw="text-4xl font-bold text-white">{tittle}</span>
                    </div>
                }
                <div tw="p-3 font-bold absolute right-1 top-1 select-none rounded-full w-6 h-6 flex items-center justify-center cursor-pointer" className="glass" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "X" : "i"}
                </div>
            </div>
        </div>
    )
}

export default LottoCard
