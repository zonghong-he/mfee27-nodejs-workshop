const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.SERVER_PORT;
// const mysql = require('mysql2');
const cors = require('cors');

const stocksRouter = require('./rooters/stocks');
const authRouter = require('./rooters/auth');
app.use(cors());
app.use(express.json());
// app.get('/ssr', (req, res, next) => {
//   res.render('index', {
//     stocks: ['台積電', '長榮航', '聯發科'],
//   });
// });
app.use(stocksRouter);
app.use(authRouter);
//設定網址變數

// app.use((req, res, next) => {
//   console.log(1);
//   next();
// });
// app.use((req, res, next) => {
//   console.log(2);
//   next();
// });
app.get('/', (req, res) => {
  console.log('end');
  res.send('Hello Express');
});
// app.get('/test', (req, res) => {
//   console.log('end');
//   res.send('Hello Express');
// });
app.use((req, res) => {
  console.log('找不到網頁');
  res.status(404).send('Oops! Not found!');
});
app.listen(port, () => {
  console.log(`server start at ${port}`);
});
