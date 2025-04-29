import { Expense } from '../models/expense.model';
import {IExpense} from '../types/express';
import { BlacklistToken } from '../models/blacklistToken.model';
import { Request, Response } from 'express';
import { validationOnAddExpense } from '../utils/validation';

interface AuthenticatedRequest extends Request {
    user?: any;
}
  
export const addExpense = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { amount, category, description } = req.body;

        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Validate request data
        const validationErrors = validationOnAddExpense(req);
        if (validationErrors.length > 0) {
            return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
        };

         // Create a new user document
         const expense = new Expense({
            amount,
            category,
            description,
            date: Date.now(),
            user_id: user._id
        });


        const savedUser = await expense.save();

        return res.status(201).json({ message: 'Expense created successfully'});
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
};

export const getAllExpenses = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {

        const user = req.user;

        const fetchExpenses = await Expense.find({user_id: user._id}) as IExpense[];

        if (fetchExpenses.length === 0) {
            return res.status(404).json({ message: "No expenses found!" });
        }

        return res.status(200).send({ status: "Date Fetched Successfully!", data : fetchExpenses});

    } catch (error) {
        return res.status(500).json({ message: 'Error in fetching', error });
    }
}

export const updateExpense = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        console.log(id);
        const { amount, category, description } = req.body;

        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Validate request data
        const validationErrors = validationOnAddExpense(req);
        if (validationErrors.length > 0) {
            return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
        }

        // Find the expense by ID and ensure it belongs to the user
        const expense = await Expense.findOne({ _id: id, user_id: user._id });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found or not authorized" });
        }

        // Update the expense fields
        expense.amount = amount ?? expense.amount;
        expense.category = category ?? expense.category;
        expense.description = description ?? expense.description;

        await expense.save();

        return res.status(200).json({ message: 'Expense updated successfully', data: expense });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating expense', error });
    }
};

export const deleteExpense = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Find and delete the expense only if it belongs to the logged-in user
        const deletedExpense = await Expense.findOneAndDelete({ _id: id, user_id: user._id });

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found or not authorized to delete" });
        }

        return res.status(200).json({ message: 'Expense deleted successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting expense', error });
    }
};
