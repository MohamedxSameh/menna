import express from "express";
import images from "./api/image";

const routes: express.Router = express.Router();

routes.use("/api/images", images);

routes.get(
  "/",
  (request: express.Request, response: express.Response): void => {
    response.send("Udacity Image proccessing API project");
  }
);

export default routes;
