import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";

const router = Router();
const usercontroller = new UserController();
const authcontroller = new AuthController();

router.post("/store", usercontroller.store);
router.get("/index", usercontroller.index);
router.post("/auth", authcontroller.authenticate);
