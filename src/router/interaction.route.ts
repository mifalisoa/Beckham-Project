import express from 'express';
import { InteractionController } from '../controllers/interaction.controller';

const InteractionRoute = express.Router();
const interactionController = new InteractionController();

InteractionRoute.get("/", (req, res) => interactionController.getInteractionController(req, res));
InteractionRoute.get("/:idInteraction", (req, res) => interactionController.getInteractionByIdController(req, res));
InteractionRoute.post("/", (req, res) => interactionController.createInteractionController(req, res));
InteractionRoute.put("/:idInteraction", (req, res) => interactionController.updateInteractionController(req, res));
InteractionRoute.delete("/:idInteraction", (req, res) => interactionController.deleteInteractionController(req, res));

export default InteractionRoute;