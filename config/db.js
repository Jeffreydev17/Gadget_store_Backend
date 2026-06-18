import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from '../config/env.js'


if (!DB_URI) {
    throw new Error('please define the MONGODB_URL environment variable inside .env.<development/production>.local')
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`connected to database in ${NODE_ENV} mode`);
    
    } catch (error) {
        console.log('Error connecting to database', error.message);
        process.exit(1);
    }
}

export default connectToDatabase;