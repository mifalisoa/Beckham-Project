import "reflect-metadata"; 
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User.model";
import { Message } from "../models/Message.model";
import { Suggestion } from "../models/Suggestion.model";
import { Publication } from "../models/Publication.model";
import { Interaction } from "../models/Interaction.model";
import { UserMessage } from "../models/UserMessage.model";

export const sequelize = new Sequelize({
    database: process.env.DB_NAME || "learnFrench",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 8889,
    dialect: "mysql",
    models: [User, Message, Suggestion, Publication, Interaction, UserMessage],
    logging: false
});

export const connectDatabase = async() => {
   console.log("HOST:", process.env.DB_HOST);
    console.log("PORT:", process.env.DB_PORT);
    console.log("DB:", process.env.DB_NAME);
    console.log("USER:", process.env.DB_USER);
    console.log("PASS:", process.env.DB_PASS);
    await sequelize.authenticate();
    await sequelize.sync();
    // await Interaction.sync({ alter: false, force: false });
}