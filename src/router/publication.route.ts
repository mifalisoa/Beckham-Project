import express from "express";
import { PublicationController } from "../controllers/publication.controller";

const PublicationRoute = express.Router();
const publicationController = new PublicationController();

PublicationRoute.get("/", (req, res) => publicationController.getAllPublicationsController(req, res));
PublicationRoute.get("/:idPublication", (req, res) => publicationController.getPublicationByIdController(req, res));
PublicationRoute.post("/", (req, res) => publicationController.createPublicationController(req, res));
PublicationRoute.put("/:idPublication", (req, res) => publicationController.updatePublicationController(req, res));
PublicationRoute.delete("/:idPublication", (req, res) => publicationController.deletePublicationController(req, res));

export default PublicationRoute;