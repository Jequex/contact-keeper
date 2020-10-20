const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {

    try {
        await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    console.log("mongoDB connected...")
    } catch (err) {
        console.error(err.message);
        console.log("unable to connect, check your internet connection")
        process.exit(1);
    }
    
}

module.exports = connectDB;