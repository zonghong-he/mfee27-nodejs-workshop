const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const bcrypt = require('bcrypt');

// 可以針對這個 router 使用某些中間件
// router.use(express.json());

// /api/1.0/auth/register
router.post('/api/auth/register', async (req, res, next) => {
  // 確認資料有沒有收到
  console.log('register', req.body);
  // TODO: 檢查 email 有沒有重複
  const [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  //     TODO: 如果有，回覆 400 跟錯誤訊息
  if (members.length !== 0) res.status(400).json({ message: 'email已註冊過' });
  // TODO: 密碼要雜湊 hash
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  // TODO: 資料存到資料庫
  pool.execute('INSERT INTO members(email,password,name) VALUE (?,?,?) ', [req.body.email, hashPassword, req.body.name]);
  // TODO: 回覆前端
  res.json('ok');
});

module.exports = router;

// ```json=
// {"email":"ashleylai58@gmail.com","name":"ashley","password":"testtest","confirmPassword":"testtest"}
// ```
