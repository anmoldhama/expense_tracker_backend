# 💰 Expense Tracker Backend

This is the backend service for the Expense Tracker application built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **TypeScript**. It handles user authentication, registration, and expense tracking functionalities.

---

## 📦 Features

- User Registration and Login (JWT-based)
- Token-based authentication with support for blacklisting on logout
- Expense CRUD operations per user
- Secure route access using middleware
- Input validation and error handling
- User can add their expenses
- User can edit their expenses
- User can view their expenses
- User can delete their expenses

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker-backend.git
cd backend


// for install the dependencies
npm install

//.env

DB_CONNECT="mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense_app"
JWT_SECRET="your_jwt_secret"
PORT=8080


// Project Structure

src/
├── controllers/
│   ├── user.controller.ts
│   └── expense.controller.ts
├── middleware/
│   └── auth.middleware.ts
├── models/
│   ├── User.ts
│   ├── Expense.ts
│   └── BlacklistToken.ts
├── config/
│   └── db.ts
├── routes/
│   ├── user.routes.ts
│   └── expense.routes.ts
├── utils/
│   └── validations.ts
├── app.ts
└── server.ts


# Start in development mode
npm run dev

# Build the project
npm run build

# Start production build
npm start


# Auth Routes

Method |       Endpoint      | Description
POST   | /api/users/register | Register new user
POST   | /api/users/login    | Login user & return token
GET    | /api/users/profile  | Get logged-in user info
POST   | /api/users/logout   | Logout user


# Expenses Routes


Method |     Endpoint      | Description
POST   | /api/expenses/    | Add new expense
GET    | /api/expenses/    | Get all user expenses
PUT    | /api/expenses/:id | Update specific expense
DELETE | /api/expenses/:id | Delete specific expense



