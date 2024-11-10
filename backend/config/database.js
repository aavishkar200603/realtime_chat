import mongoose from "mongoose";
import dotenv from "dotenv"; 
dotenv.config({});

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Database connected');
    }).catch((error)=>{
        console.log(error);
    })
};
export default connectDB;