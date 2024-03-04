import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { AuthMiddlewares } from "./middlewares/AuthMiddlewares";

export const router = Router();
const usercontroller = new UserController();
const authcontroller = new AuthController();

router.post("/store", usercontroller.store);
router.get("/index", AuthMiddlewares, usercontroller.index);
router.post("/auth", authcontroller.authenticate);
