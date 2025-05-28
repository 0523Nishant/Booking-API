# Booking-API

# 📚 Book Management API

A RESTful API built with **Node.js**, **Express.js**, and **PostgreSQL**, offering user authentication via **JWT**, CRUD operations for books, and reviews from users with pagination, filtering, and search capabilities.

---

## 🚀 Features

- 🛡️ **JWT Authentication**
  - Signup & Login endpoints
  - Token-based access for secured routes

- 📚 **Book Management**
  - Add, fetch, and view books
  - Filter by author and genre
  - Search by title or author (partial & case-insensitive)

- ✍️ **User Reviews**
  - Submit one review per book per user
  - Update or delete your own reviews
  - Paginated reviews with average rating

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **ORM**: `pg` (node-postgres)
- **Environment Variables**: dotenv
- **CORS Support**: `cors`

---

## 🏗️ Project Structure

```
Booking-api/
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── db.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
│
├── .env
├── app.js
└── package.json
```

---

## 🔐 Environment Variables (.env)

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<your_db>
JWT_SECRET=your_secret_key
```

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/book-management-api.git
cd book-management-api
npm install
```

---

## ▶️ Running the Server

```bash
# For development
npm run dev

# Or simply
node app.js
```

---

## 📬 API Endpoints

### 🔑 Authentication

| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | `/api/signup`  | Register a new user       |
| POST   | `/api/login`   | Authenticate and get JWT  |

---

### 📘 Books

| Method | Endpoint             | Description                                        |
|--------|----------------------|----------------------------------------------------|
| POST   | `/api/books`         | Add a new book *(auth required)*                  |
| GET    | `/api/books`         | Get all books (pagination & filters supported)    |
| GET    | `/api/books/:id`     | Get book details including average rating & reviews |
| GET    | `/api/search`        | Search books by title or author                   |

---

### ✍️ Reviews

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| POST   | `/api/books/:id/reviews`    | Submit review *(auth required)*     |
| PUT    | `/api/reviews/:id`          | Update your review *(auth required)*|
| DELETE | `/api/reviews/:id`          | Delete your review *(auth required)*|

---

## 🔍 Query Parameters

### Pagination (Books & Reviews)

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Filters (Books)

- `author`: Filter books by author
- `genre`: Filter books by genre

---

## 📮 Example Requests (cURL)

### Signup

```bash
curl -X POST http://localhost:5000/api/signup \
-H "Content-Type: application/json" \
-d '{"username": "nishant", "password": "secure123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{"username": "nishant", "password": "secure123"}'
```

### Add Book

```bash
curl -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"title": "The Alchemist", "author": "Paulo Coelho", "genre": "Philosophy"}'
```

---

## 🧪 Testing with Postman

1. Open Postman
2. Create a collection: **Book Management API**
3. Add the following requests:
   - POST `/api/signup`
   - POST `/api/login`
   - POST `/api/books` *(Add Bearer Token in Auth tab)*
   - GET `/api/books?page=1&limit=5`
   - GET `/api/books/:id`
   - POST `/api/books/:id/reviews`
   - PUT `/api/reviews/:id`
   - DELETE `/api/reviews/:id`

---

## 🧠 Tips

- Always include `Authorization: Bearer <token>` in headers for protected routes.
- Use `express.json()` to parse incoming request bodies.
- Handle errors with try-catch and return consistent messages.

---

## 🧑‍💻 Author

**Nishant Gupta**  
Backend Developer | Java & Node.js Enthusiast  
Feel free to connect on [LinkedIn](https://linkedin.com) or GitHub.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
