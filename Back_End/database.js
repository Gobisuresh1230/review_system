var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'review_database',
    user: 'root',
    password: 'root'
});

module.exports = connection;