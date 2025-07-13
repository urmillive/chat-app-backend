# Node.js Authentication Server

A robust Node.js server with Express.js featuring comprehensive authentication and user management capabilities.

## Features

- 🔐 **JWT-based Authentication** - Secure token-based authentication
- 👥 **User Management** - Registration, login, profile management
- 🛡️ **Role-based Access Control** - User, moderator, and admin roles
- 🔒 **Password Security** - Bcrypt hashing with salt
- ✅ **Input Validation** - Comprehensive validation using express-validator
- 🚀 **Security Features** - Helmet, CORS, rate limiting
- 📊 **MongoDB Integration** - Mongoose ODM with proper indexing
- 🎯 **Error Handling** - Centralized error management
- 📝 **API Documentation** - Complete endpoint documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd node-auth-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   MONGODB_URI=mongodb://localhost:27017/auth-server
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |
| PUT | `/api/auth/password` | Change password | Private |
| POST | `/api/auth/logout` | Logout user | Private |
| POST | `/api/auth/refresh` | Refresh token | Public |

### User Management Routes (Admin Only)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/search` | Search users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id/role` | Update user role | Admin |
| PUT | `/api/users/:id/deactivate` | Deactivate user | Admin |
| PUT | `/api/users/:id/activate` | Activate user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Utility Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/` | API information |

## Usage Examples

### User Registration

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "profile": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }'
```

### User Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get User Profile (Authenticated)

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update User Profile

```bash
curl -X PUT http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "firstName": "John",
      "lastName": "Smith"
    }
  }'
```

### Admin: Get All Users

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

## User Roles

- **user**: Basic user with profile management
- **moderator**: Can manage content and users (future feature)
- **admin**: Full access to all features including user management

## Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Comprehensive validation for all inputs
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for Express
- **Error Handling**: Secure error responses without sensitive data

## Database Schema

### User Model

```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin', 'moderator']),
  isActive: Boolean,
  lastLogin: Date,
  profile: {
    firstName: String,
    lastName: String,
    avatar: String
  },
  timestamps: true
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | Token expiration time | 24h |
| `MONGODB_URI` | MongoDB connection string | Required |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format",
      "value": "invalid-email"
    }
  ]
}
```

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Project Structure

```
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management logic
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── validation.js       # Input validation
│   └── errorHandler.js     # Error handling
├── models/
│   └── User.js             # User model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── users.js            # User management routes
├── utils/
│   └── jwt.js              # JWT utilities
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue in the repository. 