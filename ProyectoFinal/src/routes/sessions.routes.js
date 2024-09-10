import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", passport.authenticate("register", {
    failureRedirect: "/failedRegister"
}), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name, 
        last_name: req.user.last_name, 
        email: req.user.email, 
        age: req.user.age
    }

    req.session.login = true;

    const token = jwt.sign({ usuario: req.user.first_name, rol: req.user.age }, "passIndescifrable", {expiresIn: "1h"});

    res.cookie("tokenCookie", token, {
        maxAge: 3600000,
        httpOnly: true
    })

    res.redirect("/sessions/profile");
})

router.post("/login", passport.authenticate("login", {
    failureRedirect: "failed"
}), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    req.session.login = true;

    res.redirect("/sessions/profile");
})

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/");
})


router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user) {
        res.render("home", { usuario: req.user.usuario });
    } else {
        res.status(401).send("No autorizado");
    }
})

router.get("/failedRegister", (req, res) => {
    res.send("Registro fallido");
})

export default router; 