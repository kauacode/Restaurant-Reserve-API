import express from "express"
import { routes } from "./routes/index.routes"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger.json"

const PORT = 3333;

const app = express();

app.use(express.json());

app.use(routes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});