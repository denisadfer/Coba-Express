const router = require('express').Router();
const { karyawan } = require('../controllers/index');

// GET localhost:5000/karyawan => Ambil data semua karyawan
router.get('/karyawan', karyawan.getAllDatasKaryawan);

// GET localhost:5000/karyawan/:id => Ambil data karyawan berdasarkan ID
router.get('/karyawan/:id', karyawan.getDataKaryawanByID);

// GET localhost:5000/karyawan/add => Register data karyawan
router.post('/karyawan/add', karyawan.addKaryawan);

// GET localhost:5000/karyawan/login => Login karyawan
router.post('/karyawan/login', karyawan.loginKaryawan);

module.exports = router;