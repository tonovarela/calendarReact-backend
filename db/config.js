const mongoose = require('mongoose');
const dbConnection = async () => {

    try {
        console.log(process.env.DB_CNN);
        await mongoose.connect(process.env.DB_CNN);
        console.log("DB Online");
    } catch (error) {        
        throw new Error("Error al conectar en DB")
    }
}

module.exports = {
    dbConnection
}