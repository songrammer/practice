const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/e')


const Post = mongoose.model('Post', 
  { name: String,
    url: String,
    text: String
  }
 )

const Comment = mongoose.model('Comment', {
  text: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
})

let post = new Post({
    name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.'
})


post.save((err) => {
    if (err) {
      console.log(err)
    } 
    console.log('Post is saved: ', post.toJSON())
    let i = 0
    let ca = [{text: 'Cruel…..var { house, mouse} = No type optimization at all'},
      {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
      {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'} 
    ].forEach((comment, index, list) => {
      //comment.post = post._id
      //console.log(post._id)
      const c = new Comment(comment)
      c.post=post._id
      c.save((error, result)=>{
        if (error) return console.error(error)
        i++
        if (i==list.length) { //끝이 났을시에 ?
        console.log("length "+list.length)
         queryCommentWithPost()
        }
        
      })
    })
  })

  const queryCommentWithPost = () => {
    // Populate
    Comment
    .find({text: /Cruel/i})
    .populate('post')
    .exec(function (err, comment) {
      if (err) return console.error(err)
      console.log(`The comment is ${comment}`)
      mongoose.disconnect()
    })
 }