import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gabrielnez:Gabo1942@cluster0.qzr7vos.mongodb.net/coderCommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Base de datos conectada correctamente"))
    .catch((error) => console.log("Hay algun error", error))