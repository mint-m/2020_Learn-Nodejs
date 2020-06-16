var mysql = require('mysql');

let conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1252',
    port : '3306',
    database : 'software'
}); // mysql에서 정보를 인증받아오는 절차
conn.connect();

module.exports = conn;