const express = require('express')
const logger = require('morgan')
const errorhanlder = require('errorhandler')
const bodyParser = require('body-parser')
const url = 'mongodb://localhost:27017/edx-course-db'
const mongodb = require('mongodb')

app = express();

app.use(logger('dev'))
app.use(bodyParser.json())

갑자

mongodb.MongoClient.connect(url, (error, database) => {

    if (error) {
        console.log('this is err')
        return process.exit(1)
    }
    const db = database.db('edx-course-students')

    app.get('/accounts/:id', (req, res) => {
        
        db.collection('accounts')
            .find({_id:mongodb.ObjectID(req.params.id)}, { sort: { _id: -1 } })
            .toArray((error, accounts) => {
                if (error) return (error)
                res.send(accounts)
            })
    })

    app.post('/accounts', (req, res) => {
        let newAccount = req.body
        db.collection('accounts').insert(newAccount, (error, results) => {
            if (error) return next(error)
            res.status(200).send(results)
        })


    })


    app.put('/accounts/:id', (req, res) => {

        db.collection('accounts')
            .update({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body }, (error, results) => {
                if (error) return next(error)
                res.send(results)
            })


    })

    app.delete('/accounts/:id', (req, res) => {

        db.collection('accounts')
            .remove({ _id: mongodb.ObjectID(req.params.id) }, (error, results) => {
                if (error) return next(error)
                res.send(results)
            })

    })


    app.listen(3000)
    app.use(errorhanlder)

})

