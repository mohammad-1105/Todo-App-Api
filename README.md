# TODO API

This is a Todo API application built with Node.js, Express, and MongoDB. The application allows users to register, login, create, update, delete, and fetch todos. Users can also mark todos as completed or incomplete.

![Diagram](https://assets.roadmap.sh/guest/todo-list-api-bsrdd.png)


### Features

- User authentication (register, login, logout, password change)
- Create, update, delete, and fetch todos
- Mark todos as complete or incomplete
- Fetch completed and incomplete todos
- Secure routes using JWT (JSON Web Token)

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Zod for validation
- Compression for response compression
- Cookie-parser for handling cookies
- CORS for cross-origin resource sharing

### Installation

1. clone the repository

```bash
git clone https://github.com/mohammad-1105/Todo-App-Api.git
cd todo-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=8000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_ACCESS_TOKEN_SECRET=your_refresh_token_secret
CORS_ORIGIN=your_cors_origin
```

4. Start the server

```bash
npm start
```

### Usage

**Endpoints**

User Routes

- POST /api/v1/user/register - Register a new user
- POST /api/v1/user/login - Login a user
- POST /api/v1/user/logout - Logout a user (protected)
- PATCH /api/v1/user/refresh-tokens - Refresh JWT tokens (protected)
- GET /api/v1/user/current-user - Get current logged in user (protected)
- PATCH /api/v1/user/change-password - Change user password (protected)

Todo Routes

- POST /api/v1/todo/create - Create a new todo (protected)
- PATCH /api/v1/todo/update/ - Update a todo by ID (protected)
- GET /api/v1/todo/get-todo/ - Get a todo by ID (protected)
- GET /api/v1/todo/get-todos - Get all todos for the logged in user (protected)
- DELETE /api/v1/todo/delete-todo/ - Delete a todo by ID (protected)
- GET /api/v1/todo/completed - Get all completed todos (protected)
- GET /api/v1/todo/incompleted - Get all incompleted todos (protected)
- PATCH /api/v1/todo/toggle/ - Toggle the completion status of a todo (protected)

#### Middleware

- **verifyJWT** - Middleware to verify JWT and protect routes
- **errorHandler** - Middleware to handle errors and send appropriate responses

### Project Structures

```bash

├── controllers
│   ├── todo.controller.js
│   └── user.controller.js
├── middlewares
│   ├── auth.middleware.js
│   ├── errorHandler.middleware.js
├── models
│   ├── todo.model.js
│   └── user.model.js
├── routes
│   ├── todo.router.js
│   └── user.route.js
├── schemas
│   ├── loginUserSchema.js
│   ├── partialTodoSchema.js
│   ├── passwordSchema.js
│   ├── registerUserSchema.js
│   └── todoSchema.js
├── utils
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── AsyncHandler.js
├── app.js
├── db
│   └── dbConnect.js
├── constants.js
└── .env

```

### Author
Mohammad Aman

Feel free to contribute and raise issues. Happy coding!

