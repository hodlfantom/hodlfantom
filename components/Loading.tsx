import tw from "twin.macro"


function Loading() {
    return (
        <div tw=" relative w-full items-center justify-center flex flex-col p-12 animate-bounce">

            <img src="/assets/images/statspepe.png" alt="" />
            <span tw="font-bold text-4xl text-gray-900">Loading....</span>
        </div>
    )
}

export default Loading
