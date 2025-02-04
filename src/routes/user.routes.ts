import UserController from "../controllers/UserController";

import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/registrar", UserController.register.bind(UserController));
userRoutes.post("/login", UserController.login.bind(UserController));

export { userRoutes };