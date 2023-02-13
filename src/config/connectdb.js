const mysql = require('mysql');
const pool = mysql.createPool({
  multipleStatements: true,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_coba_express'
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