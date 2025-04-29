import { Document, Model, ObjectId } from 'mongoose';

export interface IUser extends Document {
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;

    getJWT(): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    hashPassword(password: string): Promise<string>;
}

// for expense

export interface IExpense extends Document {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: Date;
    user_id: ObjectId;
}

