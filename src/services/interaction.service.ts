import { IInteraction } from "../types/Interaction.type";
import { Interaction } from "../models/Interaction.model";
import { User } from "../models/User.model";
import { Publication } from "../models/Publication.model";

export class InteractionService {
    async getAllInteractions(): Promise<IInteraction[]> {
        const interactions = await Interaction.findAll({ include: [User] });
        return interactions;
    }

    async getInteractionById(IdInteraction: number): Promise<IInteraction | null> {
        const interaction = await Interaction.findByPk(IdInteraction, { include: [
            { model: User, attributes: { exclude: ["Password"] } },
            { model: Publication}
        ] });
        return interaction;
    }

    async createInteraction(interaction: IInteraction,  idPublication: number, idUser: number ): Promise<Interaction> {

        console.log("ID USER RECU :", idUser);
        if (!idUser) {
            throw new Error("idUser is required");
        }

        console.log("ID PUBLICATION RECU :", idPublication);

        if (!idPublication) {
            throw new Error("idPublication is required");
        }

        const customer = await User.findOne({
            where: {
                idUser,
                Role: "CUSTOMER"
            }
        });

        if (!customer) {
            throw new Error("User must be a CUSTOMER");
        }

        const inter = await Interaction.create({
            Type: interaction.Type,
            DateInteraction: interaction.DateInteraction,
            Contenu: interaction.Contenu,
            idUser: idUser!,
            idPublication: idPublication
        });

        await inter.reload({
            include: [
                { model: User, attributes: { exclude: ["Password"] } },
                { model: Publication}
        ]
        });

        return inter;
    }

    async updateInteraction(IdInteraction: number, interaction: IInteraction): Promise<IInteraction | null> {
        const interactionToUpdate = await Interaction.findByPk(IdInteraction);

        if (!interactionToUpdate) {
            return null;
        }

        interactionToUpdate.Type = interaction.Type;
        interactionToUpdate.DateInteraction = interaction.DateInteraction;
        interactionToUpdate.Contenu = interaction.Contenu;

        await interactionToUpdate.save();

        await interactionToUpdate.reload({
            include: [{ model: User, attributes: { exclude: ["Password"] } }]
        });

        return interactionToUpdate;
    }

    async deleteInteraction(IdInteraction: number): Promise<number> {
        const interaction = await Interaction.destroy({
            where: {
                IdInteraction
            }
        })
        return interaction;
    }
}   