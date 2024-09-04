import bcrypt from "bcrypt";
import { create } from "express-handlebars";

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export {createHash, isValidPassword};