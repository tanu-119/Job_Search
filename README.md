# Job Match Platform - AI Powered Job Recommendations 🚀

A full-stack application that matches job seekers with opportunities using AI-powered recommendations (Gemini API).

## Features ✨

- 👤 User authentication (JWT)
- 📝 Profile management
- 🔍 Job listings
- 🤖 AI-powered recommendations
- 💼 Skill-based matching

## Tech Stack 🛠️

**Frontend**: React.js, Material-UI  
**Backend**: Node.js, Express  
**Database**: MongoDB  
**AI**: Google Gemini API  

## Setup Guide (Step-by-Step) 🛠️

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Google Gemini API key
- Render.com account

### 2. Backend Setup

#### Local Development:
```bash
cd backend
npm install
```

#### Environment Variables:
Create `.env` file with:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jobsearch?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### Run Backend:
```bash
node server.js
```

### 3. Frontend Setup

#### Local Development:
```bash
cd frontend
npm install
```

#### Environment Variables:
Create `.env` file with:
```env
REACT_APP_API_URL=http://localhost:5000
```

#### Run Frontend:
```bash
npm start
```

### 4. Deployment to Render

#### Backend Service:
1. Create new **Web Service** on Render
2. Connect your GitHub repository
3. Set these configurations:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add environment variables (same as `.env` but in Render UI)

#### Frontend Service:
1. Create new **Static Site** on Render
2. Connect your GitHub repository
3. Set these configurations:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your backend service URL (e.g., `https://job-backend.onrender.com`)

### 5. Required Routes Checklist ✔️

Ensure your backend has these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/profile` | GET | Get user profile |
| `/api/profile` | PUT | Update profile |
| `/api/jobs` | GET | Get all jobs |
| `/api/recommendations` | GET | Get AI recommendations |

## Development Workflow 🔄

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/job-match-platform.git
   ```

2. **Install dependencies**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Run both servers**:
   ```bash
   # In one terminal
   cd server && npm start
   
   # In another terminal
   cd client && npm start
   ```

4. **Access the app**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## Configuration Reference ⚙️

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret for JWT tokens | `your_secret_key_here` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Allowed frontend origin | `http://localhost:3000` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000` |

## Troubleshooting 🐛

### Common Issues

1. **Connection Errors**:
   - Verify MongoDB connection string
   - Check CORS configuration matches frontend URL

2. **404 Errors**:
   - Ensure all routes are prefixed with `/api`
   - Check Render logs for deployment errors

3. **Authentication Issues**:
   - Verify JWT tokens are being sent in headers
   - Check token expiration (default: 1 hour)

4. **AI Recommendations Failing**:
   - Validate Gemini API key
   - Check prompt formatting in recommendations route
