import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import DBConnection from './src/config/db.js';
import apiRoutes from './src/routes/api.js';

// initialization
config();
const app = express();
const PORT = process.env.PORT || 8000;

// database connection
DBConnection();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', apiRoutes);

// listen
app.listen(PORT, () => console.log(`Backend running on port: ${PORT}`));