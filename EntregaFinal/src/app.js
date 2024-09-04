import express from 'express';
import exphbs from "express-handlebars";
import "./database.js";

import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import sessionRouter from './routes/sessions.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';
import passport from 'passport';


const app = express();
const port = 8080;
const fileStore = FileStore(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(session({
  secret: "gabo",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://gabrielnez:Gabo1942@cluster0.qzr7vos.mongodb.net/coderCommerce?retryWrites=true&w=majority&appName=Cluster0"
  })
}));
app.use(passport.initialize());
initializePassport();
app.use(passport.session());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/sessions/", sessionRouter);

app.listen(port, () => {
  console.log(`Escuchando Servidor en http://localhost:${port}`);
})

app.get('/', (req, res) => {
  res.send("<br> PreEntrega 1 - Gabriel Núñez <br>")
});



