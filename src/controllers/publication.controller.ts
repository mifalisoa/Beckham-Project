import { Request, Response } from "express";
import { PublicationService } from "../services/publication.service";
import { IPublication } from "../types/Publication.type";


export class PublicationController {
    
    private publicationService: PublicationService;

    constructor() {
        this.publicationService = new PublicationService();
    }

    public async getAllPublicationsController(req: Request, res: Response): Promise<void> {
        try {
            const publications = await this.publicationService.getAllPublications();
            res.status(200).json(publications);
        } catch (error) {
            res.status(500).json({ error: "Failed to get publications" });
        }
    }

    public async getPublicationByIdController(req: Request, res: Response): Promise<void> {
        try {
            const id_publication = Number(req.params.idPublication);
            const publication = await this.publicationService.getPublicationById(id_publication);
            if (publication) {
                res.status(200).json(publication);
            } else {
                res.status(404).json({ error: "Publication not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to get publication" });
        }
    }

    public async createPublicationController(req: Request, res: Response): Promise<void> {
        try {
            const publication = req.body as IPublication;
            const createdPublication = await this.publicationService.createPublication(publication, publication.idUser);
            res.status(200).json(createdPublication);
        } catch (error) {
            res.status(500).json({ error: "Failed to create publication" });
            console.error("Ato e", error);
            
        }
    }

    public async updatePublicationController(req: Request, res: Response): Promise<void> {
        try {
            const id_publication = Number(req.params.idPublication);
            const publication = req.body as IPublication;
            const updatedPublication = await this.publicationService.updatePublication(id_publication, publication);
            if (updatedPublication) {
                res.status(200).json(updatedPublication);
            } else {
                res.status(404).json({ error: "Publication not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to update publication" });
        }
    }

    public async deletePublicationController(req: Request, res: Response): Promise<void> {
        try {
            const id_publication = Number(req.params.idPublication);
            const deletedPublication = await this.publicationService.deletePublication(id_publication);
            if (deletedPublication) {
                res.status(200).json({ message: "Publication deleted successfully" });
            } else {
                res.status(404).json({ error: "Publication not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to delete publication" });
        }
    }
}