const {
  selectUser,
  insertUser
} = require('../config/connectdb');
const bcrypt = require('bcrypt');

module.exports = {
  //Ambil semua data karyawan
  async getAllDatasKaryawan(req, res) {
    const su = await selectUser();
    res
      .status(200)
      .send({
        status: 'success',
        message: 'success get datas',
        datas: su
      });
  },

  //Ambil data karyawan berdasarkan ID
  async getDataKaryawanByID(req, res) {
    const id = req.params.id;
    const su = await selectUser();
    let currentUser = su.filter((u) => u.karyawan_id.toString() === id.toString())[0];
    if (currentUser === undefined) {
      res
        .status(404)
        .send({
          status: 'fail',
          message: 'data not found'
        });
    }
    else {
      res
        .status(200)
        .send({
          status: 'success',
          message: 'success get data',
          datas: currentUser
        });
    }
  },

  //Register data karyawan
  async addKaryawan(req, res) {
    const { username, name, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const su = await selectUser();
    let currentUser = su.filter((u) => u.username === username)[0];
    try {
      if (currentUser !== undefined) {
        res
          .status(403)
          .send({
            status: 'fail',
            message: 'username already exist'
          });
      }
      else {
        insertUser(username, name, hashedPassword, address);
        res
          .status(200)
          .send({
            status: 'success',
            message: 'user added'
          });
      }
    } catch {
      res
        .status(404)
        .send({
          status: 'fail',
          message: 'register failed'
        });
    }
  },

  //Login karyawan
  async loginKaryawan(req, res) {
    const { username, password } = req.body;
    const su = await selectUser();
    let currentUser = su.filter((u) => u.username === username)[0];
    if (currentUser === undefined) {
      res
        .status(404)
        .send({
          status: 'fail',
          message: 'username not found'
        });
    }
    try {
      if (await bcrypt.compare(password, currentUser.password)) {
        res
          .status(200)
          .send({
            status: 'success',
            message: 'login success',
            data: currentUser
          });
      } else {
        res
          .status(403)
          .send({
            status: 'fail',
            message: 'password not valid'
          });
      }
    } catch {
      res
        .status(404)
        .send({
          status: 'fail',
          message: 'login failed'
        });
    }
  },
}