const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost/test')


const bookSchema =mongoose .Schema(
    {  name:String,
        published :Boolean,
        CreateAt :Date,
        updatedAt:{type:Date,default:Date.now}

    }
)

let Book =mongoose.model('Book',bookSchema)

let praticalNodebook = new Book({ 
    name: 'Practical Node.js',
    author: 'Azat',
    link:'httpfdfd',
    CreateAt:Date.now()


})
//et javascriptTheGoodPartsBook = new Book({name: 'JavaScript The good Parts'})



console.log('Is New ?',praticalNodebook.isNew)

praticalNodebook.save( (err,results)=>{

    if(err){
        console.error(err)
        process.exit(1)
    }
    else{
        console.log('Saved: ' ,results)
        console.log('Is New ?',praticalNodebook.isNew)
        Book.findOne( {_id :praticalNodebook.id},'name',(error,bookDoc) =>{

        console.log(bookDoc.toJSON())
        console.log(bookDoc.id)
        bookDoc.published=true
       //bookDoc.save(console.log)
        bookDoc.remove(process.exit)

        })
       
    }


})