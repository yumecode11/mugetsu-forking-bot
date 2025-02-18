import { bot, connection } from '../config'
import * as commands from '../commands'
import { captureCanvas, captureHolderscan } from '../utils/img'
import fs from 'fs';
import { PublicKey } from '@solana/web3.js';
import { isMintAddr, isPubkey } from '../validation';

const holderscan = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!
  const manage_wallet_msg = await commands.Holderscan.instruction();

  await bot.sendMessage(chatId, manage_wallet_msg, {
    parse_mode: 'HTML'
  })
}

const holderscanFn = async (msg: any) => {
  const chatId = msg.chat.id;
  const text = msg.text!

  try {
    let mintAddr = await isPubkey(text.split(" ")[1], chatId);
    if (!mintAddr) return;
    
    const isToken = await isMintAddr(mintAddr , chatId)
    if (!isToken) return;

    const url = 'https://holderscan.com'; // Replace with your target URL
    
      /// contact to https://t.me/yumecode for acquire

    // Send the image to the user
    bot.sendPhoto(chatId, fs.createReadStream(outputPath));
  } catch (error) {
    //  @ts-ignore
    bot.sendMessage(chatId, `\`${text.split(" ")[1]}\` is not listed on [Holderscan](https://holderscan.com)` ,{parse_mode : "MarkdownV2"});
  }
}

export {
  holderscan,
  holderscanFn
}