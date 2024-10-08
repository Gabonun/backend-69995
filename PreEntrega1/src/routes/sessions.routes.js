import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";

router.post("/register", passport.authenticate("register", {
    failureRedirect: "failed"
}), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    req.session.login = true;

    const token = jwt.sign({ usuario: req.user.first_name, rol: req.user.age }, "jwtbackendII", { expiresIn: "1h" });

    res.cookie("tokenCookie", token, {
        maxAge: 3600000,
        httpOnly: true
    })

    // res.redirect("/api/sessions/current"); //
    res.redirect("/api/sessions/profile");
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

    res.redirect("/api/sessions/profile");
})

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/");
})

router.get("/failed", (req, res) => {
    res.render("failed");

})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user) {
        res.render("home", { usuario: req.user.usuario });
    } else {
        //Si no hay un usuario asociado tiremos un error: 
        res.status(401).send("No autorizado");
    }
})

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/api/sessions/profile");
})

export default router; 