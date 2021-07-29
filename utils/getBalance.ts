import { ethers } from 'ethers'

function prettyEth(ethString) {
    let prettyString = "";
    let [num, decimals] = (ethString.split('.'));

    // This monstrosity adds a comma for every 3 digits
    if (num.length >= 5)
        num = num.replace(/(\d)(?=(\d{3})+$)/g, '$1,');

    if (decimals.length > 5)
        prettyString = num + '.' + decimals.slice(0, 5) + "... ETH";
    else
        prettyString = num + '.' + decimals + " ETH";

    return (prettyString);
}

async function getEthBalance(signerAddress, provider) {
    if (!signerAddress) {
        console.error("Can't get balance with no account");
        return;
    }

    let weiBigValue = await provider.getBalance(signerAddress);
    let ethStringValue = ethers.utils.formatEther(weiBigValue);

    return (prettyEth(ethStringValue));
}

export default getEthBalance;