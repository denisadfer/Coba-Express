const {
  selectUser,
  insertUser
} = require('../config/connectdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//Create token for login
generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
}

module.exports = {
  //Get all data karyawan
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

  //Get data karyawan by ID
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

  //Authenticate token
  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) res.status(403);
      req.user = user
      next()
    });
  },

  refreshToken() {
    const refreshToken = req.body.token;

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
    } else if (await bcrypt.compare(password, currentUser.password)) {
      const user = { username: currentUser.username };
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      res
        .status(200)
        .send({
          status: 'success',
          message: 'login success',
          userID: currentUser.id,
          username: currentUser.username,
          name: currentUser.name,
          address: currentUser.address,
          accessToken: accessToken,
          refreshToken: refreshToken
        });
    } else {
      res
        .status(403)
        .send({
          status: 'fail',
          message: 'password not valid'
        });
    }
  },

  //Logout karyawan
  async logoutKaryawan(req, res) {
    const token = req.headers['authorization'];
    jwt.sign(token, '', { expiresIn: 1 }, (logout, err) => {
      if (logout) res.send({ message: 'logout' });
    });
  },

  //Example JWT
  async exjwt(req, res) {
    const su = await selectUser();
    const currentUser = su.filter((u) => u.username === req.user.username)[0];
    res.send({
      data: currentUser
    })
  },
}