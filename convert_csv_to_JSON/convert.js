const fs= require('fs')
const path =require('path')
const csvjson =require('csvjson');
const { join } = require('path');
const file='customer-data.csv';
const new_file='customer-data.json';
let jsonObj;
fs.open(file,function(err,data){
    if(err) console.log("Sorry It's Err")
    else console.log(` ${file} open Success`)
    fs.readFile(file,'utf-8',function(error,data){
        if(error) console.log("Sorry It's read err")
        //let data_change;
       
         jsonObj=csvjson.toObject(data)

        console.log(jsonObj)
        obj=JSON.stringify(jsonObj)
        fs.writeFileSync(new_file,obj,'utf-8')
        
    })
  


    

})

    







