import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import morgan from 'morgan';
import DBConnection from './src/config/database.js';
import apiRoutes from './src/routes/api.js';
import errorHandler from './src/middlewares/errorHandler.js';
import cron from './src/crons/index.js';

// initialization
config();
const app = express();
const PORT = process.env.PORT || 8000;

// database connection
DBConnection();

// cron
cron();

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', apiRoutes);

app.use(errorHandler);

// listen
app.listen(PORT, () => console.log(`Backend running on port: ${PORT}`));