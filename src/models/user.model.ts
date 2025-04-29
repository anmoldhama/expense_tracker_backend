import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

// Import the interfaces
import { IUser, IUserModel } from '../types/express/index';

dotenv.config();

// Define the User schema
const userSchema: Schema<IUser, IUserModel> = new Schema(
    {
        fullName: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true }
        },
        password: { type: String, required: true, select: false },
        email: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

// Static method for password hashing
userSchema.statics.hashPassword = async function (password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
};
    
// Instance method to generate JWT
userSchema.methods.getJWT = async function () {
    const token = await jwt.sign({ _id: this._id, first_name: this.fullName.firstName, email: this.email }, process.env.JWT_SECRET as string, {expiresIn: '24h'});
    return token;
};

// Instance method to validate password
userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Define the User model
const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export { User };
