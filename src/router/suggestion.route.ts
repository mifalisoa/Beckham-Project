import express from "express";
import { SuggestionController } from "../controllers/suggestion.controller";

const SuggestionRoute = express.Router();
const suggestionController = new SuggestionController();

SuggestionRoute.get("/", (req, res) => suggestionController.getSuggestionsController(req, res));
SuggestionRoute.get("/:idSuggestion", (req, res) => suggestionController.getSuggestionByIdController(req, res));
SuggestionRoute.patch(
    "/:idSuggestion/examine/:adminId",
    (req, res) => suggestionController.examineSuggestionController(req, res)
);
SuggestionRoute.post("/", (req, res) => suggestionController.createSuggestionController(req, res));
SuggestionRoute.put("/:idSuggestion", (req, res) => suggestionController.updateSuggestionController(req, res));
SuggestionRoute.delete("/:idSuggestion", (req, res) => suggestionController.deleteSuggestionController(req, res));

export default SuggestionRoute;