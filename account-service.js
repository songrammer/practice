const fs =require('fs')
const path= require('path')
fs.readFile(path.join('message.txt'),{endogint: 'utf-8'},function(error,data){
    if (error) return console.error(error)
    console.log(data)
})

// const fs =require('fs')
// fs.write('message.txt','Hello  World!',function(error){
//     if(error) return console.error(error)
//     console.log("Writeing is done")
// })


const path=require('path')
const server =require(path.join('app','server.js'))
