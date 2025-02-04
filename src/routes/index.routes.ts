import { Router } from "express";
import { deskRoutes } from "./desk.routes";
import { reserveRoutes } from "./reserve.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/mesas", deskRoutes);
routes.use("/reservas", reserveRoutes);
routes.use("/usuarios", userRoutes);

export { routes };