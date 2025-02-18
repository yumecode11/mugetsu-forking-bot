import { abbrAddr } from "../utils"

const instruction = () => `/bundlecheck [contract-addres]`

const msg = (txs: any) => `Bundle Check

<a href="https://explorer.jito.wtf/bundle/${txs.bundleId}">${txs.bundleId}</a>

${txs.txSignatures.map((signature: any) => { return `<a href="https://solscan.io/tx/${signature}">${abbrAddr(signature)}</a>` }).join("\n")}
`

export {
  instruction,
  msg
}