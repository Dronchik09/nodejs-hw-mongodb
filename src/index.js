import { startServer } from "./server.js";
import { initMongoDB } from "./db/initMongoConnection.js";
const boostrap = async()=>{
    await initMongoDB();
    startServer();
};
boostrap();


