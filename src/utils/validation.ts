import validator from 'validator';
import { Request } from 'express';

const validationOnRegister = (req: Request): string[] => {
  const { fullName, email, password } = req.body;
  const errors: string[] = [];

  if (!fullName.firstName || !email || !password) {
    errors.push("Please provide all mandatory fields: first name, email, and password.");
  }

  if (fullName.firstName && fullName.firstName.length < 4) {
    errors.push("First name should be at least 4 characters long.");
  }

  if (email && !validator.isEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (password && !validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
    errors.push("Password must be at least 8 characters long and contain a mix of uppercase, lowercase, numbers, and symbols.");
  }


  return errors;
};

const validationOnAddExpense = (req: Request): string[] => {
    const { amount, category, description } = req.body;
    const errors: string[] = [];
  
    if (!amount || !category || !description) {
      errors.push("Please provide all mandatory fields: amount, category, and description.");
    }
  
    if (amount < 0 ) {
      errors.push("Amount should be greater than zero.");
    }
  
  
    return errors;
  };

export { validationOnRegister, validationOnAddExpense};
