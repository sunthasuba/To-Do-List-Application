# To-Do List Application

This is a simple To-Do List application built with Node.js, Express, and MongoDB. The application allows users to create, edit, delete, and mark tasks as completed.

## Features

- User authentication (registration and login)
- Create, read, update, and delete tasks
- Mark tasks as completed

## Prerequisites

Make sure you have the following software installed on your local machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (Community Server or use MongoDB Atlas for a cloud instance)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sunthasuba/To-Do-List-Application.git
    cd To-Do-List-Application
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory of the project and add the following:

    ```plaintext
    MONGO_URI=mongodb://localhost:27017/todo_app
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

    - `MONGO_URI`: Your MongoDB connection string.
    - `JWT_SECRET`: A secret key for JWT signing and verification.
    - `PORT`: The port on which the server will run.

## Running the Application

1. Ensure MongoDB is running locally or use a MongoDB Atlas cloud instance.

2. Start the server:

    ```bash
    npm start
    ```

3. The server will start on the port specified in the `.env` file (default is 5000). Open your browser and go to:

    ```
    http://localhost:5000
    ```

## API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
    - Request body: `{ "username": "your_username", "password": "your_password" }`
- **Login**: `POST /api/auth/login`
    - Request body: `{ "username": "your_username", "password": "your_password" }`

### Tasks

- **Get all tasks**: `GET /api/tasks`
- **Create a task**: `POST /api/tasks`
    - Request body: `{ "text": "task_text" }`
- **Update a task**: `PUT /api/tasks/:id`
    - Request body: `{ "text": "updated_text", "completed": true/false }`
- **Delete a task**: `DELETE /api/tasks/:id`

## Folder Structure
backend/
├── controllers/
│ ├── authController.js
│ └── taskController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ └── Task.js
├── routes/
│ ├── authRoutes.js
│ └── taskRoutes.js
├── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
