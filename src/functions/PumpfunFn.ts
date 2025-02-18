import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { getAssociatedTokenAddress, getMint } from '@solana/spl-token';
import * as commands from '../commands'
import { bot, connection } from '../config'
import { isMintAddr, isPubkey, isPumpToken } from '../validation';
import { getSnipersByBlocks } from '../utils';
import { EARLY_PF_WALLET_FILTER_SEC } from '../constants';
import { Snipers, SolscanBlock } from '../types';

const earlyPfWalletsMsg = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!
  const manage_wallet_msg = await commands.Pumpfun.instruction();

  await bot.sendMessage(chatId, manage_wallet_msg, {
    parse_mode: 'HTML'
  })
}

const earlyPfWalletsFn = async (msg: any) => {
  const chatId = msg.chat.id!
  const text = msg.text!
  const msgId = msg.message_id!
  const username: string = msg.from!.username!
  const callbackQueryId = msg.id!

  try {
    let mintAddr = await isPubkey(text.split(" ")[1], chatId);
    if (!mintAddr) return;

    const isToken = await isMintAddr(mintAddr, chatId)
    if (!isToken) return;

    const isPump = await isPumpToken(mintAddr, chatId)
    if (!isPump) return;

    const data: Snipers[] = await getSnipersByBlocks(text.split(" ")[1] , EARLY_PF_WALLET_FILTER_SEC)
    const reversedData = [...data].reverse();

    console.log(isToken.supply);

    const msgData = []

    for (let i = 0; i < reversedData.length; i++) {
      const element = reversedData[i];

      try {
        const ata = await getAssociatedTokenAddress(mintAddr , new PublicKey(element.from_address))
        const balanceData = await connection.getTokenAccountBalance(ata)

        if ( balanceData.value.uiAmount == null) throw new Error("No Token Balance")
  
        msgData.push({
          ...element,
          balance : Number(balanceData.value.uiAmount),
          pct : Number(balanceData.value.amount) / Number(isToken.supply),
        })
        
      } catch (error) {
        msgData.push({
          ...element,
          balance : 0,
          pct : 0,
        })
      }
    }

    const mintAddrInvalidMsg = await commands.Pumpfun.msg(msgData, mintAddr.toBase58());

    await bot.sendMessage(chatId, mintAddrInvalidMsg, {
      parse_mode: 'HTML'
    })

  } catch (error) {

    console.log(error);

    const mintAddrInvalidMsg = await commands.TopHolder.mintAddrInvalidMsg();

    await bot.sendMessage(chatId, mintAddrInvalidMsg, {
      parse_mode: 'HTML'
    })
  }
}

export {
  earlyPfWalletsMsg,
  earlyPfWalletsFn
}