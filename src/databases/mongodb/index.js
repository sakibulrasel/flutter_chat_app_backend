const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://sakibul:sakibul1991@doctorappointment.4solf.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
    
    async connect(){
        try {
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            console.log("Connected to MongoDB");
        } catch (e){
            console.error("Authentication failed for MongoDB");
        }
    }

}
