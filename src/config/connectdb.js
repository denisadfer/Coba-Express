require('dotenv').config();
const mysql = require('mysql');
const pool = mysql.createPool({
  multipleStatements: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

pool.on('error', (err) => {
  console.error(err);
});

pool.getConnection(function (err, conn) {
  if (err) throw err;
});

const selectUser = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        SELECT * FROM tb_karyawan
      `, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const insertUser = (username, name, password, address) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
      INSERT INTO tb_karyawan (username, name, password, address) VALUES (?,?,?,?)
      `, [username, name, password, address],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
};

module.exports = {
  selectUser,
  insertUser
};