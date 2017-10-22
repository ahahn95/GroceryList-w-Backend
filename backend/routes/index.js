var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/grocerylist';

    // Connect to the server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the Server', err);
        } else {
            // We are connected
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('list');

            // Find all students
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {

                    //TODO sort out headers
                    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
                    res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
                    res.header("Access-Control-Allow-Credentials", "true");
                    res.header("Content-Type", "application/json");
                    res.header("Accept","application/json");
                    res.send(result)
                } else {
                    res.send('No documents found');
                }
                //Close connection
                db.close();
            });
        }
    });
});

module.exports = router;