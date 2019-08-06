const express=require('express');
const config = require('dotenv').config()
const cors=require('cors');

const app=express();
var open = require('open');    
const db = require("mongoose");
const bodyParser=require("body-parser");
app.use(cors());
app.use(bodyParser.json());

const dbURI = process.env.MONGO_URI;

app.use(express.static('public'))
const port = process.env.PORT || 3000;

db.connect(dbURI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("Connected to DB"))
  .then(() => {
    app.listen(port, () =>{
      open('http://localhost:' + port + '/');
      console.log(`Server is running on http://localhost:${port}`)
    }
     
    );
  })
  .catch(err => {
    console.log(err);
    //throw err;
  });

const authController=require('./controllers/auth.controller');
const noteController=require('./controllers/note.controller');
app.use('/note',noteController);
app.use('/auth',authController);




module.exports=app
