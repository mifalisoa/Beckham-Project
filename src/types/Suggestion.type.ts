import { SUGGESTION_STATUS } from "../enum/suggestion.enum";

export interface ISuggestion {
    IdSuggestion?: number;
    Sujet: string;
    Description: string;
    DateCreation: Date;
    Status: SUGGESTION_STATUS;
    idUser: number
}