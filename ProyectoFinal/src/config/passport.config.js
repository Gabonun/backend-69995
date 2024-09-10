import passport from "passport";
import local from "passport-local";
import jwt, { ExtractJwt } from "passport-jwt";
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;

        try {
            let user = await UserModel.findOne({ email: email });
            if (user) return done(null, false);
            //si no existe, se crea
            let newUser = {
                first_name, 
                last_name, 
                email, 
                age, 
                password: createHash(password), 
                role: "user"
            }

            let result = await UserModel.create(newUser);

            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            const user = await UserModel.findOne({ email: email });
            if (!user){
                console.log("Usuario no encontrado");
                return done(null, false);
            }

            //verificamos password si el usuario existe
            if (!isValidPassword(password, user))
                return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }))

    //serializar y deserializar

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id:id});
        done(null, user);
    })

    /*
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "passIndescifrable"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error)
        }
    }))
        */
}

export default initializePassport;