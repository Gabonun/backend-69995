import mongoose from "mongoose";
import configObject from "./config/config.js";

const { MONGO_URL } = configObject

mongoose.connect(MONGO_URL)
    .then(() => console.log("Base de datos conectada correctamente"))
    .catch((error) => console.log("Hay algun error", error))


class Database {
    static #instance;
    constructor() {
        mongoose.connect(MONGO_URL);
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Ya conectado a la BD");
            return this.#instance;
        }
        this.#instance = new Database();
        console.log("Conectado");
        return this.#instance;
    }
}

export default Database.getInstance();