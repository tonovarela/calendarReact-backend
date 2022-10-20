const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require("cors");
const { response } = require('express');
require('dotenv').config();
const app = express();


//Base de datos
dbConnection();

app.use(cors());
app.use(express.static('public'));




//Lectura del body
app.use(express.json());

//Authentication
app.use('/api/auth', require("./routes/auth"))
//CRUD Eventos Calendar
app.use('/api/events',require("./routes/events"))

app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

app.listen(process.env.PORT , () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});