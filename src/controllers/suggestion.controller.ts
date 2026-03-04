import { Request, Response } from "express";
import { SuggestionService } from "../services/suggestion.service";
import { ISuggestion } from "../types/Suggestion.type";

export class SuggestionController {
    private suggestionService: SuggestionService;

    constructor() {
        this.suggestionService = new SuggestionService();
    }

    public async getSuggestionsController(req: Request, res: Response): Promise<void> {
        try {
            const suggestions = await this.suggestionService.getSuggestions();
            res.status(200).json(suggestions);
        } catch (error) {
            res.status(500).json({ error: "Failed to get suggestions" });
        }
    }

    public async getSuggestionByIdController(req: Request, res: Response): Promise<void> {
        try {
            const id_suggestion = Number(req.params.idSuggestion);
            const suggestion = await this.suggestionService.getSuggestionById(id_suggestion);
            if (suggestion) {
                res.status(200).json(suggestion);
            } else {
                res.status(404).json({ error: "Suggestion not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to get suggestion" });
        }
    }

    public async createSuggestionController(req: Request, res: Response): Promise<void> {
        try {
            const suggestion = req.body as ISuggestion;
            const newSuggestion = await this.suggestionService.createSuggestion(suggestion);
            res.status(200).json(newSuggestion);
        } catch (error) {
            res.status(500).json({ error: "Failed to create suggestion" });
            console.error(error);
            
        }
    }

    public async examineSuggestionController(req: Request, res: Response): Promise<void> {
        try {
            const idSuggestion = Number(req.params.idSuggestion);
            const adminId = Number(req.params.adminId);

            const result = await this.suggestionService.examineSuggestion(
                idSuggestion,
                adminId
            );

            if (!result) {
                res.status(404).json({ error: "Suggestion not found" });
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to examine suggestion" });
        }
    }

    public async updateSuggestionController(req: Request, res: Response): Promise<void> {
        try {
            const id_suggestion = Number(req.params.idSuggestion);
            const suggestion = req.body as ISuggestion;
            const updatedSuggestion = await this.suggestionService.updateSuggestion(id_suggestion, suggestion);
            if (updatedSuggestion) {
                res.status(200).json(updatedSuggestion);
            } else {
                res.status(404).json({ error: "Suggestion not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to update suggestion" });
        }
    }

    public async deleteSuggestionController(req: Request, res: Response): Promise<void> {
        try {
            const id_suggestion = Number(req.params.idSuggestion);
            const deleted = await this.suggestionService.deleteSuggestion(id_suggestion);
            if (deleted === 0) {
                res.status(404).json({ error: "Suggestion not found" });
                return;
            }
            res.status(200).json({ message: "Suggestion deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete suggestion" });
        }
    }
}