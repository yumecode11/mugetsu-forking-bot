import { bot, connection } from '../config'
import * as commands from '../commands'
import { captureCanvas, captureHolderscan } from '../utils/img'
import fs from 'fs';
import { PublicKey } from '@solana/web3.js';
import { getJitoID, getMintInfo, getTxFromJitoID } from '../api';
import { isMintAddr, isPubkey } from '../validation';

const bundlecheck = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!
  const manage_wallet_msg = await commands.Bundlecheck.instruction();

  await bot.sendMessage(chatId, manage_wallet_msg, {
    parse_mode: 'HTML'
  })
}

const bundlecheckFn = async (msg: any) => {
  const chatId = msg.chat.id;
  const text = msg.text!

  try {
    let mintAddr = await isPubkey(text.split(" ")[1], chatId);
    if (mintAddr == null) return;
    
    const isToken = await isMintAddr(mintAddr , chatId)
    if (isToken == null) return;
    
    const data = await getMintInfo(mintAddr.toBase58())
    
    const mintTx = data.first_mint_tx
    
    const bundleId = await getJitoID(mintTx)
    
    const txs = await getTxFromJitoID(bundleId)

    const bundleMsg = await commands.Bundlecheck.msg(txs);

    await bot.sendMessage(chatId, bundleMsg, {
      parse_mode: 'HTML'
    })
  } catch (error) {
    //  @ts-ignore
    bot.sendMessage(chatId, `No bundling is detected : \`${text.split(" ")[1]}\``, { parse_mode: "MarkdownV2" });
  }
}

export {
  bundlecheck,
  bundlecheckFn
}