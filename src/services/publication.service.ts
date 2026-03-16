import { IPublication } from "../types";
import { Publication } from "../models";
import { User } from "../models";
import { Interaction } from "../models";

export class PublicationService {
    public async getAllPublications(): Promise<IPublication[]> {
        return await Publication.findAll();
    }

    public async getPublicationById(IdPublication: number) {
        return await Publication.findByPk(IdPublication, {
            include: [
                { 
                    model: User, 
                    attributes: { exclude: ["Password"] } 
                },
                {
                    model: Interaction,
                    include: [
                        { model: User, attributes: ["idUser", "Name"] }
                    ]
                }
            ]
        });
    }

    public async createPublication(publication: IPublication, userInput?: number | { idUser: number }): Promise<Publication> {
        const idUser = typeof userInput === "object"
            ? userInput.idUser
            : userInput;

        const customer = await User.findOne({
            where: {
                idUser,
                Role: "ADMIN"
            }
        });

        if (!customer) {
            throw new Error("User must be a ADMIN");
        }

        const pub = await Publication.create({
            Titre: publication.Titre,
            Contenu: publication.Contenu,
            DateCreation: publication.DateCreation,
            DateModification: publication.DateModification,
            idUser: idUser!
        })

        await pub.reload({
            include: [{ model: User, attributes: { exclude: ["Password"] } }]
        });

        return pub;
    }

    public async updatePublication(IdPublication: number, publication: IPublication): Promise<IPublication | null> {
        const updatedPublication = await Publication.findByPk(IdPublication);
        if (updatedPublication) {
            updatedPublication.Titre = publication.Titre,
            updatedPublication.Contenu = publication.Contenu,
            updatedPublication.DateCreation = publication.DateCreation,
            updatedPublication.DateModification = publication.DateModification
        }
        await updatedPublication?.save();
        return updatedPublication;
    }

    public async deletePublication(IdPublication: number): Promise<number> {
        const deleted = await Publication.destroy({ where: { IdPublication: IdPublication } });
        return deleted;
    }
}