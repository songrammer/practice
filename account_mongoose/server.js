const express =require('express')
const errorhandler =require('errorhandler')
const mongoose=require('mongoose')
const logger=require('morgan')
const bodyParser = require('body-parser')

app=express()
app.use(errorhandler())
app.use(logger('dev'))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/accounts')
const AccountSchema=mongoose.Schema(
    {name:String,
    balance:Number}
)
Account = mongoose.model('accounts',AccountSchema)

app.param('id',(req,res,next)=>{

    Account.findById(req.params.id,(err,account)=>{
        req.account=account
        next()

    })

})
// ==>param 사용해서 find싸갇 없애고 req.account 로 바꿔도 된다. ==>예시는 두번째 get


app.get('/accounts',(req,res)=>{

    Account.find({},null,{sort:{_id:-1}})
    .exec((err,result)=>{
        if(err){
            console.log("can't load the account")
        }
        console.log(result)
        res.status(200).send(result)
    })
})

app.get('/accounts/:id',(req,res)=>{

    res.send(req.account)
})
app.post('/accounts',(req,res)=>{
    
    console.log(req.body)
    let account =new Account(req.body)
    account.save( (err,results)=>{
        if(err) {
            console.log("cant save")
            process.exit(1)
        }

    })
    res.status(201).send(account)
})

app.put('/accounts/:id',(req,res)=>{

    Account.findById(req.params.id,(error,account)=>{
        if(error){
            console.log("can't change")
        }
        if(req.body.name) account.name=req.body.name
        if(req.body.balance) account.balance=req.body.balance
        account.save((error,results)=>{
            res.status(200).send(results)
        })
    
    })
   
    

})
app.delete('/accounts/:id',(req,res)=>{

    Account.deleteOne({_id:req.params.id})
    .exec((err,result)=>{
        if(err){
            console.log("can't find the account")
        }
        
       
        res.status(204).send(result)
    })
   
})

app.listen(3000)


