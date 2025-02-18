import { bot, connection } from "../config";
import * as commands from '../commands'
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { AccountLayout, getMint, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getMetaData } from "../utils";
import { TOP_HOLDER_COOUNT } from "../constants";
import { getPrice } from "../api";

const topHolderMsg = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!
  const manage_wallet_msg = await commands.TopHolder.instruction();

  await bot.sendMessage(chatId, manage_wallet_msg, {
    parse_mode: 'HTML'
  })
}
const topHolderFn = async (msg: any) => {
  const chatId = msg.chat.id!;
  const text = msg.text!;
  const msgId = msg.message_id!;
  const username: string = msg.from!.username!;
  const callbackQueryId = msg.id!;
  const TOP_HOLDER_COUNT = 50; // Define the maximum holders to fetch

  try {
    const mintAddr = new PublicKey(text.split(" ")[1]);

    const metadata = await getMetaData(mintAddr);


    const tokenHoldersAta = await connection.getTokenLargestAccounts(mintAddr);
    const tokenHolderAddrs = tokenHoldersAta.value.map((ele) => ele.address);
    const tokenAccountInfo = await connection.getMultipleParsedAccounts(tokenHolderAddrs, { commitment: "processed" });

    const tokenInfo = await getMint(connection, mintAddr);

    let holderInfo = tokenAccountInfo.value.map((ele, idx) => {
      return {
        // @ts-ignore
        holder: ele?.data.parsed.info.owner,
        ...tokenHoldersAta.value[idx],
        // @ts-ignore
        percentage: (Number(ele?.data.parsed.info.tokenAmount.amount) * 100) / Number(tokenInfo.supply),
      };
    });

    // Limit holderInfo to a maximum of TOP_HOLDER_COUNT elements
    holderInfo = holderInfo.slice(0, TOP_HOLDER_COUNT);

    holderInfo.filter(ele => parseInt(ele.amount) != 0)

    const topHolderMsg = await commands.TopHolder.topHoldersMsg(holderInfo);

    // Send the message to the user
    await bot.sendMessage(chatId, topHolderMsg, {
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Error:", error);

    const mintAddrInvalidMsg = await commands.TopHolder.mintAddrInvalidMsg();
    await bot.sendMessage(chatId, mintAddrInvalidMsg, {
      parse_mode: "HTML",
    });
  }
};

export {
  topHolderMsg,
  topHolderFn
}