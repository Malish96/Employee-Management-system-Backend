var express = require('express');
var router = express.Router();
const pool = require('../DB/db.js');


/* GET users listing. */
router.get('/', function (req, res, next) {

    let search = req.query.search;
    if(search)
    {
        search="%"+search+"%";

        pool.getConnection(function (err, conn) {
            if (err)
                return res.send(400);
            // if you got a connection...

            conn.query("SELECT * FROM employee where firstName like ? OR lastName like ?" ,[search,search], function (err, rows) {
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
    }
    else {
        pool.getConnection(function (err, conn) {
            if (err)
                return res.send(400);
            // if you got a connection...
            conn.query("SELECT * FROM employee", function (err, rows) {
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

    }
});

router.get('/:id?', function (req, res, next) {

    pool.getConnection(function (err, conn) {
        if (err)
            return res.send(400);
        // if you got a connection...
        const id = req.params.id;
        conn.query("SELECT * FROM employee where employeeId= ?", [id], function (err, rows) {
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

router.delete('/:id?', function (req, res, next) {

    pool.getConnection(function (err, conn) {
        if (err)
            return res.send(400);
        // if you got a connection...
        const id = req.params.id;
        conn.query("DELETE FROM employee where employeeId= ?", id, function (err, rows) {
            if (err) {
                conn.release();
                return res.send(400, 'Couldnt get a connection');
            }
            // for simplicity, just send the rows
            res.send(200);
            // CLOSE THE CONNECTION
            conn.release();
        });


    });


});

router.post('/', function (req, res, next) {

    pool.getConnection(function (err, conn) {
        const employeeId = req.body.employeeId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const age = req.body.age;
        const dob = req.body.dob;
        const email = req.body.email;
        const designation = req.body.designation;
        const department = req.body.department;
        if (err)
            return res.send(400);
        // if you got a connection...
        conn.query(`INSERT INTO employee (employeeId, firstName, lastName,age,dob,email,designation,department) VALUES(?, ?, ?,?,?,?,?,?)`, [employeeId, firstName, lastName, age, dob, email, designation, department], function (err, rows) {
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

router.put('/:id?', function (req, res, next) {

    pool.getConnection(function (err, conn) {
        const id = req.params.id;
        const columns = Object.keys(req?.body);
        const values = Object.values(req?.body);
        values.push(id);
        if (err || !columns || !values)
            return res.send(400);
        // if you got a connection...
        let sql = "UPDATE employee SET " + columns.join(' = ? ,') + " = ?" + "WHERE employeeId = ?";

        conn.query(sql, values, function (err, rows) {
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