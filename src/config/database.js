import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // if db already connected, don't connect again
    if(connected){
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('MongoDB is connected...')
    } catch (error) {
        console.error(`Unable to connect MongoDB: ${error}`)
    }
}

export default connectDB