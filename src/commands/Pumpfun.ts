import { NATIVE_MINT } from "@solana/spl-token";
import { abbrAddr } from "../utils";

const instruction = () => `Usage: /early_pf_wallets [Token Mint CA]`

const msg = (data: any[], mint: string): string => {

  const newData = data.slice(0 , 20)

  const message = `
Pumpfun First Buyers : CA ${mint}

${newData
      .map((ele) => `<a href="https://solscan.io/account/${ele.from_address}">${abbrAddr(ele.from_address)}</a>: <a href="https://solscan.io/tx/${ele.trans_id}">${ele.amount_info.token1 === "So11111111111111111111111111111111111111111" ? "BUY" : "SELL"}</a> ${ele.amount_info.token1.slice(0, 3)} ${Number(ele.amount_info.amount1 / 10 ** ele.amount_info.token1_decimals).toFixed(1)} -> ${ele.amount_info.token2.slice(0, 3)} ${Number(ele.amount_info.amount2 / 10 ** ele.amount_info.token2_decimals).toFixed(1)} ( $${Number(ele.value).toFixed(1)} ) ${ele.balance == 0 ? "Sold All" : Number(ele.balance).toFixed(1) + "|" + Number(ele.pct * 100).toFixed(2) + "%"}`)
      .join('\n')}
`;

  return message.trim();
};

export {
  instruction,
  msg
}