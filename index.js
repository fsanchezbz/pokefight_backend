const dbJson = require('./db/db-pokemon.json');

require('dotenv').config() 
const express = require('express'); 
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');


app.listen(PORT,() => console.log("Server listening on: http://localhost:"+PORT));

app.use(express.json());

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions)); 

app.get('/',(req,res)=>{
       res.json(dbJson)
})

app.get('/pokemon/:id',(req,res)=>{
    let id = req.params.id
    let foundElement = dbJson.find(element=> element.id === parseInt(id));
    //let jsonString = JSON.stringify(foundElement);
    res.send(foundElement)
})

//(Optional) Create a GET route on /pokemon/:id/:info (<name>|<type>|<base>) 
//which gives only one pokemon from the JSON thanks to its id and retrieve only one information 
//(name or type or base) to send back to the client

 app.get('/pokemon/:id/:info',(req,res)=>{
    //info could be: name or type or base
    let id = req.params.id
    let info = req.params.info
    let finalJsonData = dbJson.find(element=> element.id === parseInt(id));
    //let jsonString = JSON.stringify(finalJsonData);
    let pokemon =[];
    if (info === "name") {
        pokemon = finalJsonData.name
      } else if (info === "type") {
        pokemon = finalJsonData.type
      } else {
        pokemon = finalJsonData.base;
      }
    res.send(pokemon)
})