var express = require("express");
var mysql = require('mysql')
var cors = require("cors")
var app = express();
app.use(cors())
app.use(express.json())

var connection = require('./database');

app.get('/login', function (req, res) {
    let sql = "SELECT * FROM loginform";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/', function (req, res) {
    let sql = "SELECT * FROM reviews_table";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/login/:id', function (req, res) {
    const id = req.params.id;
    let sql = `SELECT * FROM loginform WHERE id = ?`; 

    connection.query(sql, [id], function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/:id', function (req, res) {
    const id = req.params.id;
    let sql = `SELECT * FROM reviews_table WHERE id = ?`;
    connection.query(sql, [id], function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/reviews', (req, res) => {
    const sql = "INSERT INTO reviews_table(id,rating,description) VALUES(?)";
    const values = [
        req.body.id,
        req.body.ratings,
        req.body.description
    ]
    connection.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.post('/signup', (req, res) => {    
    const sql = "INSERT INTO loginform(username,password) VALUES(?)";
    const values = [
        req.body.userName,
        req.body.password
    ]
    connection.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.listen(3002, function () {
    console.log('App Listening on port 3002');
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Database connected!');
    })
});