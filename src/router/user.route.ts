import express from "express";
import { UserController } from "../controllers/user.controller";

const UserRoute = express.Router();
const userController = new UserController();

UserRoute.get("/", (req, res) => userController.getUsersController(req, res));
UserRoute.get("/:idUser", (req, res) => userController.getUserByIdController(req, res));
UserRoute.post("/", (req, res) => userController.createUserController(req, res));
UserRoute.put("/:idUser", (req, res) => userController.updateUserController(req, res));
UserRoute.delete("/:idUser", (req, res) => userController.deleteUserController(req, res));

export default UserRoute;