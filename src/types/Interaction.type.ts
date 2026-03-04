import { INTERACTION_TYPE } from "../enum/interaction.enum"

export interface IInteraction {
    IdInteraction?: number
    Type: INTERACTION_TYPE
    DateInteraction: Date
    Contenu?: string
    idUser: number;
    idPublication: number
}
