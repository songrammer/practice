var express = require('express')
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json())

const profile = [{
  username: 'azat',
  email: '[reducted]',
  url: 'http://azat.co'
}]

app.get('/profile', (req, res) => {
  if (req.query.id) return res.end(profile[res.query.id])
  res.send(profile)
})
app.post('/profile', (req, res) => {
  if ( (! req.body.first_name.trim()) || (!req.body.last_name.trim())) {
    return res.sendStatus(400)
  }
  let obj={
    first_name: req.body.first_name,
    last_name :req.body.last_name

  }

  profile.push(obj)
  console.log('create', profile)
  //console.log('create',req.body)

  res.sendStatus(201)
})
app.put('/profile/:id', (req, res) => {
  Object.assign(profile[req.params.id], req.body)
  console.log('upated', profile[req.params.id])
  res.sendStatus(204)
})
app.delete('/profile/:id', (req, res) => {
  profile.splice(req.params.id, 1)
  console.log("delete", profile[req.params.id])
  res.sendStatus(204)
})

app.listen(3000)