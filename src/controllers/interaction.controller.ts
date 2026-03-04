import { Request, Response } from "express";
import { InteractionService } from "../services/interaction.service";
import { IInteraction } from "../types/Interaction.type";

export class InteractionController {
    private interactionService: InteractionService;

    constructor() {
        this.interactionService = new InteractionService();
    }

    public async getInteractionController(req: Request, res: Response): Promise<void> {
        try {
            const interactions: IInteraction[] = await this.interactionService.getAllInteractions();
            res.status(200).json(interactions);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public async getInteractionByIdController(req: Request, res: Response): Promise<void> {
        try {
            const idInteraction = Number(req.params.idInteraction);
            const interaction: IInteraction | null = await this.interactionService.getInteractionById(idInteraction);
            if (interaction) {
                res.status(200).json(interaction);
            } else {
                res.status(404).json({ message: "Interaction not found" });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public async createInteractionController(req: Request, res: Response): Promise<void> {
        try {
            const interaction: IInteraction = req.body as IInteraction;
            const createdInteraction: IInteraction = await this.interactionService.createInteraction(interaction, interaction.idPublication, interaction.idUser);
            res.status(201).json(createdInteraction);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
            console.error("Ato e", error);
        }
    }

    public async updateInteractionController(req: Request, res: Response): Promise<void> {
        try {
            const idInteraction = Number(req.params.idInteraction);
            const interaction: IInteraction = req.body as IInteraction;
            const updatedInteraction: IInteraction | null = await this.interactionService.updateInteraction(idInteraction, interaction);
            if (updatedInteraction) {
                res.status(200).json(updatedInteraction);
            } else {
                res.status(404).json({ message: "Interaction not found" });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public async deleteInteractionController(req: Request, res: Response): Promise<void> {
        try {
            const idInteraction = Number(req.params.idInteraction);
            const deleted = await this.interactionService.deleteInteraction(idInteraction);
            if (deleted === 0) {
                res.status(404).json({ message: "Interaction not found" });
            } else {
                res.status(200).json({ message: "Interaction deleted successfully" });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}