import 'dotenv/config';
import {createServer} from "./config/server";
import mongoose from "mongoose";


mongoose.connect(process.env.DB_URI || 'default').then(()=>{
    const app = createServer();
    app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000,() => {
        console.log(`app listening at ${process.env.PORT ? parseInt(process.env.PORT) : 3000}`);
    });
});

