# Book Management Backend

This is a Node.js backend project for managing books with user and seller functionalities. Sellers can manage books via CSV upload, while users can view books. Authentication and authorization are implemented to ensure proper access control.

## Features

- User and Seller registration (signup)
- Login functionality for both users and sellers using email and password
- JWT for handling authentication
- Sellers can upload a CSV file to add multiple books to the database
- Sellers can view, edit, and delete their own books
- Users can retrieve a list of all books in the database and view details of a specific book

## Tech Stack

- Node.js
- Express.js
- SQLite with Sequelize ORM
- JWT for authentication
- Multer for file upload
- CSV parser for handling CSV files

## Getting Started

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/book-management-backend.git
   cd book-management-backend


2.Install dependencies
    npm install
    
3.Create a .env file in the root directory and add the following content:
    ACCESS_TOKEN_SECRET=your_secret_key

4.Start the server
    node src/server.js   

API Endpoints
   Authentication
   Register a User
   Endpoint: POST /auth/signup

  Register a Seller
  Endpoint: POST /auth/signup
  
  Login
  Endpoint: POST /auth/login

  View Seller's Books (Seller Only)
  Endpoint: GET /books/seller

  Edit a Book (Seller Only)
  Endpoint: PUT /books/seller/:id

  Delete a Book (Seller Only)
  Endpoint: DELETE /books/seller/:id
  
  View All Books
  Endpoint: GET /books

  View a Specific Book
  Endpoint: GET /books/:id

  Users
  Get User Details
  Endpoint: GET /users/me
