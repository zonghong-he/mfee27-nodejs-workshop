const express = require('express');
const router = express.Router();

const pool = require('../utils/db');

router.get('/api/stocks', async (req, res) => {
  let [data] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});

router.get('/api/:stockId', async (req, res) => {
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

module.exports = router;
