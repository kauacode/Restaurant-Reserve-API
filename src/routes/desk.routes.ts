import { Router } from "express";
import { DeskController } from "../controllers/DeskController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authAdmin } from "../middlewares/admin.middleware";

const deskRoutes = Router();
const deskController = new DeskController();

deskRoutes.get("/", authMiddleware, deskController.listAllDesks.bind(deskController));
deskRoutes.post("/", authMiddleware, authAdmin, deskController.createDesks.bind(deskController));
deskRoutes.patch("/:id", authMiddleware, deskController.updateDesks.bind(deskController));
deskRoutes.delete("/:id", authMiddleware, authAdmin, deskController.deleteDesks.bind(deskController));

export { deskRoutes };