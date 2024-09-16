import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import apiRoutes from './routes/api.js';

// initialization
config();
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', apiRoutes);

// listen
app.listen(PORT, () => console.log(`Backend running on port: ${PORT}`));