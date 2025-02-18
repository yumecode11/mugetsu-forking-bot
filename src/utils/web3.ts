import { Metaplex } from "@metaplex-foundation/js";
import { connection } from "../config";
import { ConfirmedSignatureInfo, ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { getMintInfo, getTxBtwBlocks, getTxByBlock } from "../api";
import { SolscanBlock } from "../types";

const metaplex = Metaplex.make(connection);

const getMetaData = async (mintAddress: PublicKey) => {

  const metadataAccount = metaplex
    .nfts()
    .pdas()
    .metadata({ mint: mintAddress });

  const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    const token = await metaplex.nfts().findByMint({ mintAddress: mintAddress });

    return token
  }
}

const getMintTransaction = async (mintPublicKey: PublicKey, beforeSig?: string) => {
    /// contact to https://t.me/yumecode for acquire
}

const getSnipersByBlocks = async (mintAddress: string, filter_sec : number) => {
    /// contact to https://t.me/yumecode for acquire

  return data;
}

export {
  getMetaData,
  getMintTransaction,
  getSnipersByBlocks
}