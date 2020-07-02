const monogdb =require('mongodb')
const MongoClient= monogdb.MongoClient


//insertDocument


const insertDocuments =(db,callback)=>{

    const collection =db.collection('edx-course-students')
    collection.insert(
        [{name:'bob'},{name : 'John'},{name:'Peter'}],(err,result)=>{
            
            if(err) return process.exit(1)
            console.log(result.result.n)
            console.log(result.ops.length)
            console.log('Inserted 3 documents into the edx-course-students collection')
           // console.log(result)
            callback(result)
            
        })


}

const updateDocument = (db, callback) => {
    // Get the edx-course-students collection
    var collection = db.collection('edx-course-students')
    // Update document where a is 2, set b equal to 1
    const name = 'Peter'
    collection.update({ name : name }, { $set: { grade : 'A' } }, (error, result) => {
        if (error) return process.exit(1)
        console.log(result.result.n) // will be 1
        console.log(`Updated the student document where name = ${name}`)
        callback(result)
    })
  }

  const removeDocument = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('edx-course-students')
    // Insert some documents
    const name = 'John'
    collection.remove({ name : name }, (error, result) => {
      if (error) return process.exit(1)
      console.log(result.result.n) // will be 1
      console.log(`Removed the document where name = ${name}`)
      callback(result)
    })
  }

var findDocuments =(db,callback)=>{
    var collection =db.collection('edx-course-students')
    collection.find({}).toArray((error,docs)=>{
    if(error) return process.exit(1)
    console.log(2,docs.length)
    console.log(`Found the following documents:`)
    //console.dir(docs)
    callback(docs)

    })

}

//Connect URL

const url ='mongodb://localhost:27017/edx-course-db'

MongoClient.connect(url,(err,database)=>{
    if(err) return process.exit(1)
    console.log('Kudos. Connected successfully to server')
    const db= database.db('edx-course-students')
    console.log('Connection is okay')

    insertDocuments(db, () => {
        updateDocument(db, () => {
          removeDocument(db, () => {
            findDocuments(db, () => {
              database.close()
            })
          })
        })
      })
    })