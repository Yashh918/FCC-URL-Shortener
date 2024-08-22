import mongoose from "mongoose";
const dbName = 'UrlShortener'

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
        console.log(`\n MongoDb connected !!! Db Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection failed ", error);
        process.exit(1)
    }
}

export default connectDb