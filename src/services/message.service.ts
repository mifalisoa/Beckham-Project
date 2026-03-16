import { IMessage } from "../types";
import { Message } from "../models";
import { User } from "../models";

export class MessageService {
    public async getMessages(): Promise<IMessage[]> {
        const allMessages = await Message.findAll({ include: [{ model: User, through: { attributes: [] } }] });
        return allMessages;  
    }

    public async getMessageById(idMessage: number): Promise<IMessage | null> {
        const message = await Message.findByPk(idMessage, { include: [{ model: User, through: { attributes: [] } }] });
        return message;
    }

    public async createMessage(message: IMessage, usersInput?: number[] | { idUser: number }[]): Promise<Message> {
        // création du message
        const messageCreate = await Message.create({
            TextContenu: message.TextContenu,
            DateEnvoi: message.DateEnvoi
        });

        // liaison avec les users si présent
        if (usersInput && usersInput.length > 0) {
            const idUsers: number[] = typeof usersInput[0] === 'object'
                ? (usersInput as { idUser: number }[]).map(u => u.idUser)
                : (usersInput as number[]);

            const customers = await User.findAll({ 
                where: { 
                    idUser: idUsers,
                    Role: "CUSTOMER"
                } 
            });
            await messageCreate.$set("Users", customers);
        }

        // rechargement avec inclusion des Users
        await messageCreate.reload({ include: [{ model: User, through: { attributes: [] } }] });
        return messageCreate;
    }

    public async updateMessage(idMessage: number, message: IMessage, usersInput?: number[] | { idUser: number }[]): Promise<Message | null> {
        const messageUpdate = await Message.findByPk(idMessage, { include: [{ model: User, through: { attributes: [] } }] });
        if (!messageUpdate) return null;

        // update contenu
        messageUpdate.TextContenu = message.TextContenu;
        messageUpdate.DateEnvoi = message.DateEnvoi;
        await messageUpdate.save();

        // update des users liés si fourni
        if (usersInput) {
            const idUsers: number[] = typeof usersInput[0] === 'object'
                ? (usersInput as { idUser: number }[]).map(u => u.idUser)
                : (usersInput as number[]);

            const customers = await User.findAll({ 
                where: { 
                    idUser: idUsers,
                    Role: "CUSTOMER"
                } 
            });
            await messageUpdate.$set("Users", customers);
        }

        await messageUpdate.reload({ include: [{ model: User, through: { attributes: [] } }] });
        return messageUpdate;
    }

    public async deleteMessage(idMessage: number): Promise<number> {
        const deleted = await Message.destroy({
            where: {
                IdMessage: idMessage
            }
        });
        return deleted;
    }

}