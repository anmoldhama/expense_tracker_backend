import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDb from './config/db';
import userRoute from '../src/routes/user.route';
import expenseRoute from '../src/routes/expense.route';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());

connectToDb();
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api', expenseRoute);

export default app;