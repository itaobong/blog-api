# Blog API

A RESTful API for a blogging platform built with TypeScript, Express.js, and MongoDB. This API provides user authentication, blog post management, and a commenting system.

## Features

### User Management
- User registration and authentication
- JWT-based authentication
- Password hashing using bcrypt
- User profiles with following capability

### Blog Posts
- Create, read, update, and delete blog posts
- List all posts with pagination
- Search posts by title and content
- Filter posts by author

### Comments
- Add comments to posts
- View comments for a post
- Edit and delete comments
- Nested comments support

## Technology Stack

- **Runtime Environment**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **API Documentation**: OpenAPI/Swagger
- **Development Tools**: nodemon, ts-node

## Prerequisites

Before running this project, make sure you have the following installed:

1. Node.js (v14 or higher)
2. MongoDB (v4.4 or higher)
3. npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd blog-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blog-api
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h
   ```

4. Build the TypeScript code:
   ```bash
   npm run build
   ```

## Database Setup

1. Install MongoDB:
   - Windows: Download and install from [MongoDB Website](https://www.mongodb.com/try/download/community)
   - Linux: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/administration/install-on-linux/)
   - macOS: `brew install mongodb-community`

2. Start MongoDB:
   - Windows: MongoDB runs as a service by default
   - Linux/macOS: `sudo systemctl start mongod`

3. Verify MongoDB connection:
   - The API will automatically create the required collections
   - Default database name is 'blog-api'

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for development.

### Production Mode
```bash
npm start
```
This will run the compiled JavaScript code.

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Blog Post Endpoints

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "content": "string"
}
```

#### Get All Posts
```http
GET /api/posts
```

#### Get Single Post
```http
GET /api/posts/:id
```

#### Update Post
```http
PATCH /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "content": "string"
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Search Posts
```http
GET /api/posts/search?query=string
```

### Comment Endpoints

#### Add Comment
```http
POST /api/posts/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "string"
}
```

#### Get Post Comments
```http
GET /api/posts/:postId/comments
```

#### Update Comment
```http
PATCH /api/posts/:postId/comments/:commentId
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "string"
}
```

#### Delete Comment
```http
DELETE /api/posts/:postId/comments/:commentId
Authorization: Bearer <token>
```

## Project Structure

```
blog-api/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── post.controller.ts
│   │   └── comment.controller.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Post.ts
│   │   └── Comment.ts
│   ├── interfaces/
│   │   └── index.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── post.routes.ts
│   │   └── comment.routes.ts
│   └── server.ts
├── dist/           # Compiled JavaScript files
├── .env            # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register a new user or login to get a JWT token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your-token>
   ```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 404: Resource not found
- 500: Server error

Error responses follow this format:
```json
{
  "error": "Error message here"
}
```

## Development

### TypeScript Configuration
The project uses TypeScript for type safety. Configuration is in `tsconfig.json`.

### Code Style
- Use ESLint and Prettier for code formatting
- Follow TypeScript best practices
- Use async/await for asynchronous operations
- Implement proper error handling

## Testing

To run tests (when implemented):
```bash
npm test
```

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Set up production environment variables
3. Start MongoDB
4. Run the server:
   ```bash
   npm start
   ```

## Security Considerations

1. Passwords are hashed using bcrypt
2. JWT tokens are required for protected routes
3. Environment variables are used for sensitive data
4. Input validation is implemented
5. CORS is configured for security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email your-email@example.com or create an issue in the GitHub repository.
