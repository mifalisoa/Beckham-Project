import { Suggestion } from "../models";
import { ISuggestion } from "../types";
import { User } from "../models";
import { SUGGESTION_STATUS } from "../enum";
import { USER_ROLE } from "../enum";

export class SuggestionService {
    public async getSuggestions(): Promise<Suggestion[]> {
        const suggestions = await Suggestion.findAll({
            include: [{ model: User, attributes: { exclude: ["Password"] } }]
        });
        return suggestions;
    }

    public async getSuggestionById(idSuggestion: number): Promise<ISuggestion | null> {
        const suggestion = await Suggestion.findByPk(idSuggestion, {
            include: [{ model: User, attributes: { exclude: ["Password"] } }]
        });
        return suggestion;
    }

    public async createSuggestion(suggestion: ISuggestion): Promise<ISuggestion> {

        if (!suggestion.idUser) {
            throw new Error("User ID is required to create a suggestion");
        }

        const customer = await User.findOne({
            where: {
                idUser: suggestion.idUser,
                Role: "CUSTOMER"
            }
        });

        if (!customer) {
            throw new Error("User must be a CUSTOMER");
        }

        const createdSuggestion = await Suggestion.create({
            Sujet: suggestion.Sujet,
            Description: suggestion.Description,
            DateCreation: suggestion.DateCreation,
            Status: suggestion.Status,
            idUser: suggestion.idUser
        });

        await createdSuggestion.reload({
            include: [{ model: User, attributes: { exclude: ["Password"] } }]
        });

        return createdSuggestion;
    }

    public async examineSuggestion(idSuggestion: number,adminId: number): Promise<ISuggestion | null> {

        const suggestion = await Suggestion.findByPk(idSuggestion);

        if (!suggestion) {
            return null;
        }
        const admin = await User.findOne({
            where: {
                idUser: adminId,
                Role: USER_ROLE.ADMIN
            }
        });

        if (!admin) {
            throw new Error("Only ADMIN can examine a suggestion");
        }

        await suggestion.update({
            Status: SUGGESTION_STATUS.TRAITEE
        });

        return suggestion;
    }

    public async updateSuggestion(idSuggestion: number, suggestion: ISuggestion): Promise<ISuggestion | null> {
        const updatedSuggestion = await Suggestion.findByPk(idSuggestion);
        if (updatedSuggestion) {
            updatedSuggestion.Sujet = suggestion.Sujet,
            updatedSuggestion.Description = suggestion.Description,
            updatedSuggestion.DateCreation = suggestion.DateCreation
            updatedSuggestion.Status = suggestion.Status
        }
        await updatedSuggestion?.save();
        return updatedSuggestion;
    }

    public async deleteSuggestion(idSuggestion: number): Promise<number> {
        const deleted = await Suggestion.destroy({ where: { IdSuggestion: idSuggestion } });
        return deleted;
    }
}