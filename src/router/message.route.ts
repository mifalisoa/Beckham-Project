import express from "express";
import { MessageController } from "../controllers/message.controller";

const MessageRoute = express.Router();
const messageController = new MessageController();

MessageRoute.get("/", (req, res) => messageController.getMessagesController(req, res));
MessageRoute.get("/:idMessage", (req, res) => messageController.getMessageByIdController(req, res));
MessageRoute.post("/", (req, res) => messageController.createMessageController(req, res));
MessageRoute.put("/:idMessage", (req, res) => messageController.updateMessageController(req, res));
MessageRoute.delete("/:idMessage", (req, res) => messageController.deleteMessageController(req, res));

export default MessageRoute;