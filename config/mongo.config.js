const mongoose = require("mongoose");
mongoose.set('debug', true);

const connectDB = async () => {
    try {  
        console.log("trying to connect to db: ");
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'ArqaDB'
        });
        console.log("MongoDB Connected to ArqaCluster1");
    } catch (error) {
        console.error("MongoDB Connection Failed!!!!!\n", error);
        process.exit(1);
    }
};

module.exports = connectDB;
