import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';

import { IExpense } from '../types/express/index';

dotenv.config();

// Define the User schema
const expenseSchema: Schema<IExpense> = new Schema(
    {
        amount: { type: Number, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true},
        date: { type: Date, required: true, unique: true },
        user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
    },
    { timestamps: true }
);

// Define the User model
const Expense = mongoose.model<IExpense>('Expenses', expenseSchema);

export { Expense };
