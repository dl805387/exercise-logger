const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://duser:97cDsT5j@cluster0.q3kwg.mongodb.net/workout?retryWrites=true&w=majority";
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology: true};

MongoClient.connect(connectionString, mongoOptions).then(client => {
    
    console.log('Connected to Database');
    const db = client.db('workout');
    const collection = db.collection('exercises');
    
    // Passes the data from the database into the index.ejs file.
    app.get('/', (req, res) => {
        collection.find().toArray().then(results => {
            res.render('index.ejs', { exercises: results });
        }).catch(error => console.error(error));
    });
    
    // Creates exercise and adds it into the database.
    app.post('/insert', (req, res) => {
        collection.insertOne(req.body).then(result => {
            res.redirect('/');
        }).catch(error => console.error(error));
    });

    // Updates the exercise in the database document.
    app.post('/update', (req, res) => {
        // This if statement checks to see if there is only 1 set. This determines how the table is creates in the index.ejs file.
        if (req.body.sets.length == 1) {
            collection.findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        previous: req.body.previous,
                        setOneToTwo: false,
                        onlyOneSet: true,
                        pre: false
                    }
                },
                {
                  upsert: true
                }
            ).then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
        } else {
            collection.findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        previous: req.body.previous,
                        setOneToTwo: false,
                        onlyOneSet: false,
                        pre: false
                    }
                },
                {
                  upsert: true
                }
            ).then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
        }
    });
    
    // Increases the sets by 1, which adds a row to the table.
    app.post('/add', (req, res) => {
        // This if statement checks to see if there is only 1 set. Going from 1 set to 2 set will change how the table is created.
        if (req.body.sets.length == 1) {
            collection.findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        previous: req.body.previous,
                        sets: req.body.sets.length + 1,
                        setOneToTwo: true,
                        onlyOneSet: false,
                        pre: false
                    }
                },
                {
                  upsert: true
                }
            ).then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
        } else {
            collection.findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        previous: req.body.previous,
                        sets: req.body.sets.length + 1,
                        setOneToTwo: false,
                        onlyOneSet: false,
                        pre: false
                    }
                },
                {
                  upsert: true
                }
            ).then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
        }


        
    });

    // Decreases the sets by 1, which removes a row from the table.
    app.post('/sub', (req, res) => {
        // This if statement prevents the number of sets to go below 1.
        if (req.body.sets.length == 1) {
            collection.findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        previous: req.body.previous,
                        setOneToTwo: false,
                        onlyOneSet: true,
                        pre: false
                    }
                },
                {
                  upsert: true
                }
            ).then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
        } else {
            collection.findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        previous: req.body.previous,
                        sets: req.body.sets.length - 1,
                        setOneToTwo: false,
                        onlyOneSet: false,
                        pre: false
                    }
                },
                {
                  upsert: true
                }
            ).then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
        }
    });

    // Sets pre to true, which allows the user to see weight x reps.
    // User can use this to save their data before they change it.
    app.post('/previous', (req, res) => {
        if (req.body.sets.length == 1) {
            collection.findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        previous: req.body.previous,
                        setOneToTwo: false,
                        onlyOneSet: true,
                        pre: true
                    }
                },
                {
                  upsert: true
                }
            ).then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
        } else {
            collection.findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        previous: req.body.previous,
                        setOneToTwo: false,
                        onlyOneSet: false,
                        pre: true
                    }
                },
                {
                  upsert: true
                }
            ).then(result => {
                res.redirect('/');
            }).catch(error => console.error(error));
        }
    });

    // Removes the exercise from the database.
    app.post('/remove', (req, res) => {
        collection.deleteOne(
            { name: req.body.name }
        ).then(result => {
            res.redirect('/');
        }).catch(error => console.error(error));
    });
    
    app.listen(3000, function() {
        console.log('listening on 3000');
    });

}).catch(error => console.error(error));

// npm run dev
// control c
// git add -A

// can also open with node server.js
// sometimes this won't work if mongoDB doesnt have your current address
// you can go to the database, click on network address, then add your current address