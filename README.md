# Fleet Management System

A full-stack web application for managing fleet operations including vehicles, trips, and user management with data visualization capabilities.

## 🚀 Features

- **User Authentication** - Secure login/register with JWT tokens
- **Vehicle Management** - Add, view, and manage fleet vehicles
- **Trip Management** - Create and track trips with detailed analytics
- **Dashboard Analytics** - Visual data representation with charts
- **User Management** - Admin controls for user operations
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
fleet-management/
├── backend/
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication middleware
│   ├── models/         # Database schemas
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── store/      # Redux store
│   └── public/         # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fleet-management
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/fleet-management
JWT_SECRET=your-jwt-secret-key
PORT=5000
```

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create new trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Analytics
- `GET /api/graphs` - Get dashboard analytics data

## 🎨 Frontend Features

- **Dashboard** - Overview with charts and statistics
- **Trip Management** - Create and view trips
- **Vehicle Management** - Fleet vehicle operations
- **User Management** - Admin user controls
- **Authentication** - Secure login system
- **Responsive Design** - Works on all devices

## 🔧 Development

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm start        # Start server
npm run dev      # Start with nodemon (if configured)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Issues

If you encounter any issues, please create an issue on the repository with detailed information about the problem.

## 📞 Support

For support and questions, please contact the development team.