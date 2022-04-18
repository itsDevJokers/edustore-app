// KONFIGURASI MONGODB DAN MONGOOSE

// Import Semua Dependensi yang diperlukan
const mongoose = require('mongoose');
const {dbHost, dbPass, dbName, dbPort, dbUser} = require('../app/config');

// Koneksi ke database
mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
const db = mongoose.connection;

// Ekspor ke file bin/www
module.exports = db;