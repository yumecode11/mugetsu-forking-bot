import puppeteer from 'puppeteer';
import fs from 'fs'
import { sleep } from '.';

async function captureCanvas(url: string, selector: string, outputPath: string) {
  /// contact to https://t.me/yumecode for acquire
  return outputPath;
}

async function captureHolderscan(url: string, selector: string, outputPath: string, mintAddr: string) {
  /// contact to https://t.me/yumecode for acquire
  return outputPath;
}

// async function captureHolderscan(url: string, selector: string, outputPath: string) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
//   await page.goto(url, {
//     waitUntil: "networkidle2"
//   });
//   await page.content();
//   await page.waitForSelector("[class^='TokenPage_tokenTableContainer']");
//   await sleep(2000)

//   // await page.waitForSelector(".recharts-responsive-container]");

//   await page.evaluate(() => {
//     const element = document.querySelector("[class^='TokenPage_tokenTableContainer']");
//     if (element) {
//       //  @ts-ignore
//       element.remove()
//     }
//   });

//   let canvasElement = await page.$(selector);

//   if (!canvasElement) return;
//   await canvasElement.screenshot({ path: outputPath });
//   await browser.close();
//   return outputPath;
// }


export {
  captureCanvas,
  captureHolderscan
}