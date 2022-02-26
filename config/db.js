const mongoose = require('mongoose');

const connectToDb =()=> mongoose.connect(process.env.DB_URI).then(()=>console.log('connected to present db'));

module.exports = connectToDb;
