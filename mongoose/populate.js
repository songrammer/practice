const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
Schema = mongoose.Schema

const userSchema = Schema(
    {
        name: String,
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
    }
)

const postSchema = Schema(
    {
        _creator: { type: Schema.Types.ObjectId, ref: 'User' },
        title: String,
        text: String
    }
)


let Post = mongoose.model('Post', postSchema)
let User = mongoose.model('User', userSchema)

var azat = new User(
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'azat',
    }
)
var post = new Post(
    {
        _creator: azat._id,
        title: "hi",
        text: " iam a new customer"
    }
)


console.log('Is New ?', azat.isNew)


azat.save((err, results) => {

    if (err) {
        console.error(err)
        process.exit(1)
    } else {

        azat.posts.push(post._id)
        azat.posts.push(post._id)
        console.log('azat Saved: ', results)
        post.save((err, results) => {
            if (err) {
                console.log("cant,'t save post")
            }
            console.log('post Saved: ', results)

            User.findOne({ name: /azat/i })
                .populate('posts')
                .exec(function (err, user) {
                    if (err) return handleError(err)
                    console.log('The user has % post(s)', user.posts)
                    process.exit(0)
                })

        
        })


    }

})


