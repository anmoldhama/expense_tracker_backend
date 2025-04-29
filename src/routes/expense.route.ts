
import { Router } from 'express';
import { addExpense, getAllExpenses, updateExpense, deleteExpense } from '../controllers/expense.controller';
import {userAuth} from '../middlewares/auth';

const router = Router();

router.post('/expenses',userAuth, addExpense);
router.get('/expenses',userAuth, getAllExpenses);
router.put('/expenses/:id',userAuth, updateExpense);
router.delete('/expenses/:id',userAuth, deleteExpense);

export default router;
