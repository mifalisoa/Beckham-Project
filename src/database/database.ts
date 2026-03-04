import "reflect-metadata"; 
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User.model";
import { Message } from "../models/Message.model";
import { Suggestion } from "../models/Suggestion.model";
import { Publication } from "../models/Publication.model";
import { Interaction } from "../models/Interaction.model";
import { UserMessage } from "../models/UserMessage.model";

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    models: [User, Message, Suggestion, Publication, Interaction, UserMessage],
    logging: false
});

export const connectDatabase = async() => {
    await sequelize.authenticate();
    await sequelize.sync();
    // await Interaction.sync({ alter: false, force: false });
}