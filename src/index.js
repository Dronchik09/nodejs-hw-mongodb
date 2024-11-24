import { startServer } from "./server.js";
import { initMongoDB } from "./db/initMongoConnection.js";
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
const boostrap = async()=>{
    await initMongoDB();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    startServer();
};
boostrap();


