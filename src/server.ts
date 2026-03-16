import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database/database';
import { mainRouter } from './router';

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
app.use('/', mainRouter)

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
