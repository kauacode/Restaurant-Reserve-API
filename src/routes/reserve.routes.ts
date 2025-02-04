import { Router } from "express";
import { ReserveController } from "../controllers/ReserveController";
import { authMiddleware } from "../middlewares/auth.middleware";

const reserveRoutes = Router();
const ControllerReserve = new ReserveController();

reserveRoutes.get("/", authMiddleware, ControllerReserve.listAllReserves.bind(ControllerReserve));
reserveRoutes.post("/", authMiddleware, ControllerReserve.createReservation.bind(ControllerReserve));
reserveRoutes.patch("/:id/cancelar", authMiddleware, ControllerReserve.patch.bind(ControllerReserve));

export { reserveRoutes };