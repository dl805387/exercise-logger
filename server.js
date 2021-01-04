const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://duser:97cDsT5j@cluster0.q3kwg.mongodb.net/test?retryWrites=true&w=majority";
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology: true};

MongoClient.connect(connectionString, mongoOptions).then(client => {
    console.log('Connected to Database');
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');
    
    // read
    // this function gets activated when the server starts
    app.get('/', (req, res) => {
        //const cursor = db.collection('quotes').find();
        //console.log(cursor);
        //res.sendFile(__dirname + '/index.html');
        //console.log("start");
        db.collection('quotes').find().toArray().then(results => {
            //console.log(results);
            res.render('index.ejs', { quotes: results });
        }).catch(error => console.error(error));
    });
    
    // create
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body).then(result => {
            res.redirect('/');
        }).catch(error => console.error(error));
    });

    // new routing method
    app.post('/test', (req, res) => {
        console.log("action 1");
        quotesCollection.findOneAndUpdate(
            { name: req.body.name },
            {
              $set: {
                name: req.body.name,
                reps: req.body.reps,
                weight: req.body.weight,
                previous: req.body.previous
              }
            },
            {
              upsert: true
            }

        ).then(result => {
            res.redirect('/');
        }).catch(error => console.error(error));
    });
    //action_two
    app.post('/action_two', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: req.body.name },
            {
              $set: {
                sets: req.body.sets.length + 1
              }
            },
            {
              upsert: true
            }

        ).then(result => {
            res.redirect('/');
        }).catch(error => console.error(error));
    });

    app.post('/action_3', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: req.body.name },
            {
              $set: {
                sets: req.body.sets.length - 1,
                name: req.body.name,
                reps: req.body.reps,
                weight: req.body.weight,
                previous: req.body.previous
              }
            },
            {
              upsert: true
            }

        ).then(result => {
            res.redirect('/');
        }).catch(error => console.error(error));
    });










    // update
    app.put('/quotes', (req, res) => {
        console.log("this is put");
        console.log(req.body);
        console.log(res.body);
        quotesCollection.findOneAndUpdate(
            { name: '' },
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote
              }
            },
            {
              upsert: true
            }

        ).then(result => {
            res.json('Success');
        }).catch(error => console.error(error));
    });

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            { name: req.body.name }
          )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                  };
              res.json(`Deleted Darth Vadar's quote`)
            })
            .catch(error => console.error(error));
    });
    
    app.listen(3000, function() {
        console.log('listening on 3000');
    });

}).catch(error => console.error(error));



// npm run dev
// control c
// git add -A
