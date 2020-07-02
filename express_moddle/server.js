const express = require('express');
const bodyParser = require('body-parser');
const morgan =require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use((request, response, next)=>{
    console.log(`${request.method}: ${request.url}`)
     next();
});

app.use((request, response, next)=>{
  if(request.query.api_key){
    next();
  }else{
    response.status(401).send({msg: 'Not authorized'});
  }
});

app.get('/', (req, res) => {
 
  res.send({'msg': 'root'});
})

app.get('/accounts', (req, res, next) => {
  console.log('inline middleware accounts');
  
  next(new Error('ooops'));
},(req, res) => {
  res.send('accounts');
})

app.post('/transactions',(req, res) => {
    console.log(req.body)
    res.send({'msg':'transactions'});
})

//Error handling
app.use((error, req, res, next) => {
  console.log(`error: [${error}]`);
  res.status(500).send(`{Success: false, ${error}}`);
})

app.listen(3000);