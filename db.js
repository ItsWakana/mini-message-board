const mongoose = require("mongoose");
require("dotenv").config();


const runDatabase = async () => {
    
    const mongoDBPassword = process.env.MONGO_DB_PASSWORD;
    const databaseName = "mini_message_board";
    
    const mongoDB = `mongodb+srv://admin:${mongoDBPassword}@cluster0.jqqmhiw.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    
    await mongoose.connect(mongoDB);
}

module.exports = runDatabase;


