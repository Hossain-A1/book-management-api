# Minimal Library Management System

A simple library management app built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, and **Tailwind CSS**. It supports book CRUD, borrowing, and a borrow summary—**no login or payment** required.

---

## Features

- **Book List**: View all books with options to edit, delete, or borrow.
- **Add Book**: Form to add a new book.
- **Edit Book**: Update book info with quantity validation.
- **Borrow Book**: Borrow a book with quantity and due date input.
- **Borrow Summary**: See total borrowed quantities per book.
- **Responsive UI**: Mobile, tablet, and desktop support.

---

## Routes

- `/books` – All books list  
- `/create-book` – Add book  
- `/books/:id` – Book details  
- `/edit-book/:id` – Edit book  
- `/borrow/:bookId` – Borrow form  
- `/borrow-summary` – Borrow summary

---

## Tech Stack

- React + TypeScript  
- Redux Toolkit + RTK Query  
- Tailwind CSS  
- RESTful API integration

---

## How to Run (with npm)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/library-app.git

# 2. Navigate to the project folder
cd library-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
