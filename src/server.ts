import dotenv from 'dotenv';
import express, {Response, Request} from 'express';
import cors from 'cors';
import { connectDatabase } from './database/database';
import UserRoute from './router/user.route';
import MessageRoute from './router/message.route';
import SuggestionRoute from './router/suggestion.route';
import PublicationRoute from './router/publication.route';
import InteractionRoute from './router/interaction.route';

dotenv.config();

/**
 * CONFIGURATION
 */
const app = express();
const port = process.env.PORT ?? 3000;
app.use(express.json({ limit: '10mb' }));

// middleWare pour gérer le cors(partage securise entre backend et frontend)
app.use(cors({
  origin: '*', 
  credentials: true
}));


/**
 * ROUTES
 */
app.use('/users', UserRoute);
app.use('/messages', MessageRoute);
app.use('/suggestions', SuggestionRoute);
app.use('/publications', PublicationRoute);
app.use('/interactions', InteractionRoute);


app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Serveur TypeScript en marche !");
});

/**
 * LISTENER
 */

const start = async() => {
  await connectDatabase();
  console.log("Connected database");
  console.log("Database synchronized");
}

start().catch((error) => {
  console.error("Error of starting the application", error);
})

app.listen(port, async () => {
  try {
    console.log(`Server start in http://localhost:${port}`);
  } catch (error) {
    console.error('connection error:', error);
    process.exit(1);
  }
});
