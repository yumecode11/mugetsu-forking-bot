import { PublicKey } from "@solana/web3.js";
import { bot, connection } from "../config";
import { getMint } from "@solana/spl-token";

const isPubkey = async (addr: string, chatId: number) => {
  try {
    const mintAddr = new PublicKey(addr)
    return mintAddr
  } catch (error) {
    await bot.sendMessage(chatId, "Invalid Address", {
      parse_mode: 'HTML'
    })
    return null;
  }
}

const isMintAddr = async (mintAddr: PublicKey, chatId: number) => {
  try {
    const data =  await getMint(connection, mintAddr)
    return data
  } catch (error) {
    await bot.sendMessage(chatId, "Invalid Token Address", {
      parse_mode: 'HTML'
    })
    return null;
  }
}

const isPumpToken = async (mintAddr: PublicKey, chatId: number) => {
  if (!mintAddr.toBase58().includes("pump")) {
    await bot.sendMessage(chatId, "Invalid Pumpfun Addr", {
      parse_mode: 'HTML'
    })
    return null;
  } else {
    return mintAddr;
  }
}



export {
  isPubkey,
  isMintAddr,
  isPumpToken
}