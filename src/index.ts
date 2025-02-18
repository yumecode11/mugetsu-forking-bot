import * as fn from './functions'
import * as commands from './commands'
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { bot, connection } from './config';
import { CallbackQuery } from 'node-telegram-bot-api';
import { getHolderInfo, getJitoID, getMintInfo, getPrice, getTxBtwBlocks, getTxByBlock } from './api';
import { SolscanBlock } from './types';
import { getSnipersByBlocks } from './utils';

let botName: string

const start = async () => {
  console.log( await getMintInfo("USDCVZr4PDronye9xeMXpPTUcgZ7dyjmuxS8bchq3H7"))
  bot.getMe().then((user: any) => {
    botName = user.username!.toString()
  })

  bot.setMyCommands(commands.commandList)

  bot.on(`message`, async (msg: any) => {
    const chatId = msg.chat.id!
    const text = msg.text!
    const msgId = msg.message_id!
    const username: string = msg.from!.username!
    const callbackQueryId = msg.id!

    switch (text) {

      case `/top_holders`:
        await fn.TopHolderFn.topHolderMsg(msg)
        break;
      case `/early_pf_wallets`:
        await fn.PumpfunFn.earlyPfWalletsMsg(msg)
        break;
      case `/hmap`:
        await fn.Hmap.hmap(msg)
        break;
      case `/holderscan`:
        await fn.Holderscan.holderscan(msg)
        break;
      case `/bundlecheck`:
        await fn.Bundlecheck.bundlecheck(msg)
        break;
      case `/common_top_traders`:
        await fn.CommonTopTrader.commonTopTradersMsg(msg)
        break;

      default:
        if (text != "" && text != undefined) {
          switch (text.split(" ")[0]) {
            case `/top_holders`:
              await fn.TopHolderFn.topHolderFn(msg)
              break;

            case `/early_pf_wallets`:
              await fn.PumpfunFn.earlyPfWalletsFn(msg)
              break;

            case `/hmap`:
              await fn.Hmap.hmap(msg)
              break;

            case `/holderscan`:
              await fn.Holderscan.holderscanFn(msg)
              break;

            case `/bundlecheck`:
              await fn.Bundlecheck.bundlecheckFn(msg)
              break;

            case `/common_top_traders`:
              await fn.CommonTopTrader.commonTopTradersFn(msg)
              break;

            default:
              break;
          }
        }
        break;
    }
  })
}

start()