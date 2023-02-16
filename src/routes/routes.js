const router = require('express').Router();
const { authenticateToken } = require('../controllers/controllers');
const { karyawan } = require('../controllers/index');

// GET localhost:5000/karyawan => Ambil data semua karyawan
router.get('/karyawan', karyawan.getAllDatasKaryawan);

// GET localhost:5000/karyawan/:id => Ambil data karyawan berdasarkan ID
router.get('/karyawan/:id', karyawan.getDataKaryawanByID);

// POST localhost:5000/karyawan/add => Register data karyawan
router.post('/karyawan/add', karyawan.addKaryawan);

// POST localhost:5000/karyawan/login => Login karyawan
router.post('/karyawan/login', karyawan.loginKaryawan);

// DELETE localhost:5000/karyawan/logout => Logout karyawan
router.delete('/karyawan/logout', authenticateToken, karyawan.logoutKaryawan);

// DELETE localhost:5000/karyawan/logout => Logout karyawan
router.post('/karyawan/exjwt', authenticateToken, karyawan.exjwt);

module.exports = router;