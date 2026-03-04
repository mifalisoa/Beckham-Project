import { Request, Response } from "express";
import { MessageService } from "../services/message.service";
import { IMessage } from "../types/Message.type";

export class MessageController {
    private messageService: MessageService;

    constructor() {
        this.messageService = new MessageService();
    }

    public async getMessagesController(req: Request, res: Response): Promise<void> {
        try {
            const messages = await this.messageService.getMessages();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: "Failed to get messages" });
        }
    }
    public async getMessageByIdController(req: Request, res: Response): Promise<void> {
        try {
            const id_message = Number(req.params.idMessage);
            const message = await this.messageService.getMessageById(id_message);
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ error: "Message not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to get message" });
        }

    }

    public async createMessageController(req: Request, res: Response): Promise<void> {
        try {

            // Extraction du message et des users depuis le body
            const { TextContenu, DateEnvoi, users } = req.body;

            // Convertir users en tableau d'idUser si présent
            const userIds: number[] | undefined = users?.map((u: { idUser: number } | number) =>
                typeof u === "object" ? u.idUser : u
            );
            
            const message = await this.messageService.createMessage(
                { TextContenu, DateEnvoi },
                userIds
            );
            res.status(200).json(message);
        } catch (error) {
            console.error("Erreur dans createMessage:", error);
            res.status(500).json({ error: "Failed to create message" });
        }
    }

    public async updateMessageController(req: Request, res: Response): Promise<void> {
        try {
            const id_message = Number(req.params.idMessage);
            const { TextContenu, DateEnvoi, users } = req.body;

            const userIds: number[] | undefined = users?.map((u: { idUser: number } | number) =>
                typeof u === "object" ? u.idUser : u
            );
            
            const message = await this.messageService.updateMessage(id_message, { TextContenu, DateEnvoi }, userIds);
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ error: "Message not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to update message" });
        }
    }

    public async deleteMessageController(req: Request, res: Response): Promise<void> {
        try {
            const id_message = Number(req.params.idMessage);
            console.log(id_message);
            
            const deleted = await this.messageService.deleteMessage(id_message);

            if (deleted === 0) {
                res.status(404).json({ error: "Message not found" });
                return;
            }

            res.status(200).json({ message: "Message deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete message" });
        }
    }

}
