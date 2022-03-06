import mongoose from "mongoose";

export const connectToDb = async ()=> {
    const connectionResult = await mongoose.connect(process.env.DB_URI || 'default').then(()=>console.log('connected to present db'));
}


