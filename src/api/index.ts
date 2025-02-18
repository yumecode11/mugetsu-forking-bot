import puppeteer from 'puppeteer';
import axios from 'axios';
import fs from 'fs';
import { BIT_QUERY_TOKEN, connection } from '../config';

const getPrice = async (mint_addr_array: string[]) => {
  
  /// contact to https://t.me/yumecode for api

  return result
};

const getSnipeWalletWithBitquery = async (mintAddr: string, limit: number) => {
  
  /// contact to https://t.me/yumecode for api

  return data
}

const getHolderInfo = async () => {
  
  /// contact to https://t.me/yumecode for api

  return data
}

const getMintInfo = async (mintAddr: string) => {

  /// contact to https://t.me/yumecode for api
  
  return data
}

const getTxByBlock = async (slot: number, txType: string, txStatus: "Success" | "Fail" = "Success") => {
  
  /// contact to https://t.me/yumecode for api
  
  return newData
}

const getTxBtwBlocks = async (mintAddr: string, block_time: number, period: number, activity_type: Array<"ACTIVITY_AGG_TOKEN_SWAP" | "ACTIVITY_TOKEN_SWAP">, page_size: number = 40, page: number = 1) => {

  /// contact to https://t.me/yumecode for api

  return data
}



const getJitoID = async (tx: string) => {

  /// contact to https://t.me/yumecode for api
  
  return data
}

const getTxFromJitoID = async (jitoID: string) => {
  
  /// contact to https://t.me/yumecode for api

  return data
}


const getTopTrader = async (mintAddr: string) => {

  /// contact to https://t.me/yumecode for api

  return data
}

const saveToJSONFile = (filePath: string, data: any): boolean => {

  fs.writeFileSync(filePath, data, 'utf8');
  console.log('Data saved to JSON file.');
  return true;
};

export {
  getPrice,
  getSnipeWalletWithBitquery,
  getHolderInfo,
  getJitoID,
  getMintInfo,
  getTxFromJitoID,
  getTopTrader,
  getTxByBlock,
  getTxBtwBlocks
}