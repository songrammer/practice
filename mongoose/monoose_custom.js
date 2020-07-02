const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost/edx-course-db')

const bookSchema =mongoose.Schema({name:String})



bookSchema.method({
    buy: function(quantity,customer,callback){
        var bookToPurchase=this;
        console.log('buy')
        return callback()

    },
    refund :function(customer,callback){
        console.log('refund')
        return callback()
    }


})




bookSchema.static({
    getZeroInventoryReport: function(callback) {
      //run a query on all books and get the ones with zero inventory
      let books=[]
      console.log('getZeroInventoryReport')
      return callback(books)

    },
    getCountOfBooksById: function(bookId, callback){
      //run a query and get the number of books left for a given book
      console.log('getCountOfBooksById')
      let count=0
      return callback(count)
    }
  })
  

  let Book =mongoose.model('Book',bookSchema)

  Book.getZeroInventoryReport(()=>{

  })

  Book.getCountOfBooksById(123,()=>{

  })

  let praticalNodebook = new Book({ 
    name: 'Practical Node.js',

})

praticalNodebook.buy(1,2,()=>{

})
praticalNodebook.refund(1,()=>{

})

bookSchema.post('save',function(next){
    console.log('postsave')
    return next()

})

bookSchema.pre('remove',(next)=>{
    console.log('premove')
    return next()
})



praticalNodebook.save( (err,results)=>{

    if(err){
        console.error(err)
        process.exit(1)
    }
    else{
        console.log('Saved: ' ,results)
       
        
       //bookDoc.save(console.log)
        praticalNodebook.remove( (err,results)=>{

            if(err){
                console.error(err)
                process.exit(1)
            }else{
                process.exit(0)
            }

        })

    
       
    }


})