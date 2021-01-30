const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require("cors");

//Connecting to DB
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Opendoors744784',
    database: 'CRUDDataBase',
})

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


//GET FROM DB
app.get('/api/get', (req, res) => {
    // SELECT * FROM TABLE
    const sqlSelect = 
    "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        //onsole.log(result);
        res.send(result)        //SEND DATA TO THE FRONT, SEND EVERYTHIGN WITH RESULT
    });
})



// POST INTO DB
app.post('/api/insert', (req, res) => {             //name of route for post function
    // CALL THE DATA THAT YOU WILL RECEIVE FROM FRONTEND
    const movieName = req.body.movieName            //require
    const movieReview = req.body.movieReview

    // INSERT INTO DB
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)"    //the ? does not insert a variable directly into the db underneath we use an array to write the var's ourself
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    })
})



// DELETE FROM DB
app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName
    const sqlDelete = 
    "DELETE FROM movie_reviews WHERE movieName = ?"     //Delete from the table where movie name is = ?(name we set above)

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err)
    })
});


//UPDATE DATA IN DB
app.put("/api/update", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?"        //table name SET then column or columns you want updated

    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err)
    })
})


app.listen(3001, () => {
    console.log('running on port: ' + port)
});





/*  test sending something to the db 
app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');"
    db.query(sqlInsert, (err, result) => {
        res.send("Hello World");
    })
})
*/ 