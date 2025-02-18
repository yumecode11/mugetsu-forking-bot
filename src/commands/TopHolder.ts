import { abbrAddr } from "../utils"

const instruction = () => `Usage: /top_holders [Token Mint CA]`
const mintAddrInvalidMsg = () => `Invalid [Token Mint CA]`

const topHoldersMsg = (param: any[]) => `Top Holders

${param.map(ele => `<a href="https://solscan.io/account/${ele.holder}">${abbrAddr(ele.holder)}</a> : \t${parseFloat(ele.uiAmount).toFixed(2)} ( ${parseFloat(ele.percentage).toFixed(3)} % )`).join("\n")}`

export {
  instruction,
  mintAddrInvalidMsg,
  topHoldersMsg
}