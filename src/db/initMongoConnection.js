// mongodb+srv://Dronchik:<db_password>@cluster0.p5hdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import {env} from "../utils/env.js";
import mongoose from "mongoose";

export const initMongoDB = async() =>{
        try {
            const user = env('MONGODB_USER');
            const password = env('MONGODB_PASSWORD');
            const url = env('MONGODB_URL');
            const db = env('MONGODB_DB');
            await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`);
         console.log('Mongo connection successfully established!');
    } catch (e) {
      console.log('Error while setting up mongo connection', e);
      throw e;
    }
};
