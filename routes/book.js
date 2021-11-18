const express = require('express');
const router = express.Router();

const pool = require('../DB/db.js');


router.get('/', function (req, res, next) {

    pool.getConnection(function (err, conn) {
        if (err)
            return res.send(400);
        // if you got a connection...
        conn.query("SELECT * FROM book", function (err, rows) {
            if (err) {
                console.log(err);
                conn.release();
                return res.send(400, 'Couldnt get a connection');
            }
            // for simplicity, just send the rows
            res.send(rows);
            // CLOSE THE CONNECTION
            conn.release();
        });


    });


});
router.get('/:id?', function (req, res, next) {

    pool.getConnection(function (err, conn) {
        if (err)
            return res.send(400);
        // if you got a connection...
        const id = req.params.id;
        conn.query("SELECT * FROM book where bid= ?", [id], function (err, rows) {
            if (err) {
                console.log(err);
                conn.release();
                return res.send(400, 'Couldnt get a connection');
            }
            // for simplicity, just send the rows
            res.send(rows[0]);
            // CLOSE THE CONNECTION
            conn.release();
        });


    });


});

router.post('/', function (req, res, next) {

    pool.getConnection(function (err, conn) {
        const bid = req.body.bid;
        const name = req.body.name;
        const pub_id = req.body.pub_id;
        if (err)
            return res.send(400);
        // if you got a connection...
        conn.query(`INSERT INTO book (bid, name, pub_id) VALUES(?, ?, ?)`, [bid, name, pub_id], function (err, rows) {
            if (err) {
                console.log(err);
                conn.release();
                return res.send(400, 'Couldnt get a connection');
            }
            // for simplicity, just send the rows
            res.send(rows);
            // CLOSE THE CONNECTION
            conn.release();
        });


    });


});


module.exports = router;