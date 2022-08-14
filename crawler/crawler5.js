// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();
// 開始抓資料
// 2330 台積電
// 2603 長榮
// TODO: 需要從 stock.txt 的檔案裡讀取股票代碼
let queryDate = moment().format('YYYYMMDD'); //'20220814';
// axios.get(url, 設定)

(async () => {
  let connectDb = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    let stockNo = await fs.promises.readFile('stockNo.txt', 'utf8');
    // console.log(stockNo);
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    let result = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
      params: {
        query: stockNo,
      },
    });
    let suggestion = result.data.suggestions[0];
    let stockName = suggestion.split('\t').pop();
    connectDb.execute(`INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)`, [stockNo, stockName]);
    console.log(stockName);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
})();
