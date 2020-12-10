const mongoose = require("mongoose")
//dotenv.config({path:'./config/keys.env'});

const dotenv = require("dotenv");
//SET UP dotenv eniroment 
//dotenv.config({path:'./config/key.env'});
dotenv.config({path:'./config/keys.env'});

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>{
    console.log("Connect to the MongoDB successful")
})
.catch((err)=>{
    console.log(`There was a problem connect to the db. ${err}`);  
})
