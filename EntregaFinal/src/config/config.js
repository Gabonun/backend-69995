import dotenv from "dotenv"; 

import program from "../utils/commander.js"; 
const { mode } = program.opts(); 

dotenv.config({
    path: mode === "desarrollo" ? "./.env.development" : "./.env.production"
}); 

const configObject = {
    PORT: process.env.PORT, 
    MONGO_URL: process.env.MONGO_URL,
    persistence: process.env.persistence || "mongo"
}

export default configObject; 