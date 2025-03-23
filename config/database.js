require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
    // Connect to the MongoDB database
    connectToDatabase: async () => {
        try {
            // Ensure Mongoose uses the new URL parser and unified topology
            await mongoose.connect(process.env.MONGODB_CONNECTION);
            console.log('Connected to MongoDB Atlas');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        
        }
    }
};


// mongodb+srv://<db_username>:<db_password>@cluster0.b1f0ncj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://<db_username>:<db_password>@cluster0.b1f0ncj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// lbw1p1LvteifNdAs
// crmProject