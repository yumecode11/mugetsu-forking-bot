import { config } from 'dotenv';

config()

const EARLY_PF_WALLET_FILTER_SEC = parseInt(process.env.EARLY_PF_WALLET_FILTER_SEC || "10")
const EARLY_PF_WALLET_COUNT = parseInt(process.env.EARLY_PF_WALLET_COUNT || "10")
const TOP_HOLDER_COOUNT = parseInt(process.env.TOP_HOLDER_COOUNT || "50")

export {
  EARLY_PF_WALLET_FILTER_SEC,
  EARLY_PF_WALLET_COUNT,
  TOP_HOLDER_COOUNT
}