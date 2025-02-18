import { bot, connection } from "../config";
import * as commands from '../commands'
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { AccountLayout, getMint, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getMetaData } from "../utils";
import { TOP_HOLDER_COOUNT } from "../constants";
import { getPrice } from "../api";

const commonTopTradersMsg = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!
  const manage_wallet_msg = await commands.CommonTopTrader.instruction();

  await bot.sendMessage(chatId, manage_wallet_msg, {
    parse_mode: 'HTML'
  })
}
const commonTopTradersFn = async (msg: any) => {

};

export {
  commonTopTradersMsg,
  commonTopTradersFn
}