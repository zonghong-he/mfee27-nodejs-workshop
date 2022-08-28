const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.SERVER_PORT;
const mysql = require('mysql2');
const cors = require('cors');

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    dateStrings: true,
  })
  .promise();

app.use(cors());
// app.get('/ssr', (req, res, next) => {
//   res.render('index', {
//     stocks: ['台積電', '長榮航', '聯發科'],
//   });
// });
app.get('/api/stocks', async (req, res) => {
  let [data] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});
//設定網址變數
app.get('/api/:stockId', async (req, res) => {
  //req.params 取得網址
  const stockId = req.params.stockId;
  const perPage = 5;
  const page = req.query.page || 1;
  const count = await pool.execute(`SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id = ?`, [stockId]);
  const total = count[0][0].total;
  const lastPage = Math.ceil(total / perPage);

  //取得變數 req.query.變數名
  let [data] = await pool.execute(`SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?`, [stockId, perPage, perPage * (page - 1)]);
  const pagination = {
    perPage,
    page,
    total,
    lastPage,
  };
  // console.log(total);
  res.json({ pagination, data });
});

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
