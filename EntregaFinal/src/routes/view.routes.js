import { Router } from "express";
import * as viewController from "../controllers/view.controller.js";

const router = Router();

router.get("/", viewController.renderHome);

router.get("/products", viewController.renderProducts);

router.get("/realtimeproducts", viewController.renderRealTimeProducts);

router.get("/products/:pid", viewController.renderProductDetails)

router.get("/carts/:cid", viewController.renderCart);

router.get("/api/sessions/register", viewController.renderRegister);

router.get("/api/sessions/login", viewController.renderLogin);

router.get("/api/sessions/profile", viewController.renderProfile);

export default router;