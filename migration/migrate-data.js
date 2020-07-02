
const url = 'mongodb://localhost:27017/BitCoin'
const mongodb = require('mongodb')
const fs = require('fs')
const async = require('async');
const { error } = require('console');
const e = require('express');

var json_customer;
var json_address;
let tasks = []
const limit = parseInt(process.argv[2], 10) || 1000

mongodb.MongoClient.connect(url, (err, database) => {


    if (err) return process.exit(1)
    console.log('Kudos. Connected successfully to server')
    const db = database.db('BitCoin')

    console.log('Connection is okay')

    var data1 = fs.readFileSync('./m3-customer-data.json', 'utf-8');
    json_customer = JSON.parse(data1);

    var data2 = fs.readFileSync('./m3-customer-address-data.json', 'utf-8');
    json_address = JSON.parse(data2);

    console.log("Success download !")
    json_customer.forEach((customer, index, list) => {
        json_customer[index] = Object.assign(customer, json_address[index])

        if ((index % limit) == 0) {
            console.log('c!!!!!!!!!!')
            const start = index
            const end = (start + limit) > (json_customer.length) ? json_customer.length - 1 : start + limit
            tasks.push((done) => {
                
                db.collection('customers').insert(json_customer.slice(start, end), (error, results) => {
                    done(error, results)
                  })


            })
        }
    })


    async.parallel(tasks, (error, results) => {
        if (error) console.error(error)
        console.log(results)
        database.close()

    })

})

// var insertDocuments = (db,customers,start,end ,callback) => {


//     console.log("touch")

//     db.collection('customer').insert(customers.slice(start ,end), (err, result) => {
//             if (err) {
//                 console.log('err4')
//                 return process.exit(1)
//             }

//             console.log(result.result.n)
//             console.log('Inserted 3 documents into the edx-course-students collection')
//              //console.log(result)
//              callback(error,result)
//         })

// }

