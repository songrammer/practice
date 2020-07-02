const mongoose =require('mongoose')
const { ETIME } = require('constants')

mongoose.connect('mongodb://localhost/edx-course-db')
mongoose.connect('mongodb://localhost/test')


const bookSchema =mongoose .Schema(
    {  name:String,
        published :Boolean,
        CreateAt :Date,
        email:String,
        reviews :[mongoose.Schema.Types.Mixed],
        updatedAt:{type:Date,default:Date.now}

    }
)


bookSchema.virtual()
    .get(function (){
        if(!this.email) return null
        var crypto =require('crypto')
        email=this.email
        email=email.trim()
        email =email.toLowerCase()
        var hash=crypto
            .createHash('md5')
            .update(email)
            .digest('hex')
        var  gravateBaseUrl ='https://secure/gravator.com/avatar'
        return  gravateBaseUrl+hash
    })

let Book =mongoose.model('Book',bookSchema)

let praticalNodebook = new Book({ 
    name: 'Practical Node.js',
    author: 'Azat',
    email :'hi@zat.co',
    link:'httpfdfd',
    CreateAt:Date.now()


})


praticalNodebook.save( (err,results)=>{
    if(err){
        console.error(err)
        process.exit(1)
    }else{
        console.log('Saved: ' ,results)
        console.log('Book author photo :',praticalNodebook.authorPhtoUrl)
        process.exit(0)
    }

})

