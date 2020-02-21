const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors')
const Bodyparser = require('body-parser');
const urlencoded = Bodyparser.json({ extended: true });

const PORT = 4003;

app.use(cors())
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
})

connection.connect(err => {
    if (err) {
        throw (err);
    }
})


app.get('/todo', (req, res) => {
    connection.query("SELECT * FROM details", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            console.log('in connect data get', data)
            res.end(JSON.stringify(data));
        }
    })
})

app.get('/user/:id', (req, res) => {
    console.log('in', req.params.id)
    var id = req.params.id
    connection.query("SELECT * FROM details where userid=?", id, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

app.post('/user', urlencoded, (req, res) => {
    let data = req.body;
    var arr = [];
    console.log('data in post user', data)
    arr.push([parseInt(data.id), (data.username)])
    console.log(arr)
    var id = parseInt(data.id);
    connection.query("INSERT INTO user (id,username) VALUES (?)", arr, (err, results) => {
        if (err) {
            connection.query("SELECT * FROM details where userid=?", id, (err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    console.log('data ', data)
                    res.send(data)
                }
            })
            console.log('result ', results)
        } else {
            connection.query("SELECT * FROM details where userid=?", id, (err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    console.log('data ', data)
                    res.send(data)
                }
            })
            console.log('result ', results)
        }

    })
})
app.post('/details', urlencoded, (req, res) => {
    let data = req.body;
    var arr = [];
    console.log("data", data)
    arr.push([data.msg, parseInt(data.userid)])
    var id = parseInt(data.userid);
    console.log("details", arr)
    connection.query("INSERT INTO details (msg,userid) VALUES (?)", arr, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            connection.query("SELECT * FROM details where userid=?", id, (err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    console.log('data ', data)
                    res.send(data)
                }
            })
            console.log('result ', results)
        }

    })
})



app.listen(PORT, () => {
    console.log(`server started in ${PORT}`)
})