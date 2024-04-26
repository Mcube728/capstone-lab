//load environment variables
if (process.env.NODE_ENV != "production"){ // only done if env is dev or testing 
    require("dotenv").config();
}

const mongoose = require("mongoose");

async function connectToDB(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to Database!")
    }
    catch (err){
        console.log(err);
    }
}

module.exports = connectToDB;