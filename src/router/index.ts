import { Router } from "express";
import UserRoute from "./user.route";
import MessageRoute from "./message.route";
import PublicationRoute from "./publication.route";
import InteractionRoute from "./interaction.route";
import SuggestionRoute from "./suggestion.route";

const mainRouter: Router = Router();

mainRouter.use('/users', UserRoute);
mainRouter.use('/messages', MessageRoute);
mainRouter.use('/publications', PublicationRoute);
mainRouter.use('/Interactions', InteractionRoute);
mainRouter.use('/Suggestions', SuggestionRoute);

mainRouter.get('/', (req, res) => {
    res.send('Hello TypeScript + Express!');
});

export{mainRouter};