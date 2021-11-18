const mysql = require("mysql");
const dbConfig = require("../config/dbConfig");

// Create a connection to the database



var pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    connectionLimit: 10,               // this is the max number of connections before your pool starts waiting for a release
    multipleStatements: true           // I like this because it helps prevent nested sql statements, it can be buggy though, so be careful
});

module.exports = pool;