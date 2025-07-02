
# Period Tracker API

A comprehensive, self-hosted backend for period tracking applications built with FastAPI and designed to run on free-tier cloud services.

## Features

- **User Authentication**: JWT-based authentication system
- **Cycle Tracking**: Complete menstrual cycle logging and history
- **Symptom Tracking**: Log and analyze symptoms with severity levels
- **Ovulation Tracking**: Basal temperature, cervical fluid, and ovulation test tracking
- **AI Insights**: Powered by Google Gemini API for cycle analysis and health insights
- **Predictions**: Smart predictions for next period and ovulation windows
- **Notifications**: Automated reminders for periods and ovulation
- **File Uploads**: Profile picture and document storage
- **API Documentation**: Full OpenAPI/Swagger documentation

## Quick Start

### Local Development

1. **Clone and Setup**
   ```bash
   git clone <your-repo>
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Run the Application**
   ```bash
   uvicorn main:app --reload
   ```

3. **Access the API**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

### Database Setup

The app uses SQLite by default for development. For production, set the `DATABASE_URL` environment variable:

```bash
# PostgreSQL
export DATABASE_URL="postgresql://username:password@localhost/dbname"

# SQLite (default)
export DATABASE_URL="sqlite:///./period_tracker.db"
```

### Environment Variables

```bash
SECRET_KEY=your-secret-key-here
DATABASE_URL=your-database-url
PORT=8000
```

## Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on git push

### Render

1. Connect your GitHub repository to Render
2. Use the provided `render.yaml` configuration
3. Set up PostgreSQL database
4. Deploy automatically

### Fly.io

```bash
fly launch
fly deploy
```

### GitHub Actions Cron Job

Set up the following secrets in your GitHub repository:
- `API_URL`: Your deployed API URL

The workflow will automatically call the notifications endpoint daily.

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### User Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

### Cycle Tracking
- `POST /cycles` - Create new cycle
- `GET /cycles` - Get user cycles
- `GET /cycles/{id}` - Get specific cycle

### Symptoms
- `POST /symptoms` - Log symptoms
- `GET /symptoms` - Get symptom history

### Ovulation
- `POST /ovulation` - Log ovulation data
- `GET /ovulation` - Get ovulation history

### Predictions & Insights
- `GET /predictions/next-period` - Predict next period
- `GET /predictions/ovulation` - Predict ovulation
- `GET /insights/cycle-analysis` - AI-powered cycle insights

### AI Chat
- `POST /ai/chat` - Chat with AI about health topics

### Notifications
- `POST /notifications/setup` - Setup user notifications
- `GET /notifications/check` - Check and send due notifications (cron endpoint)

### File Upload
- `POST /upload` - Upload files (images only)

## Database Schema

The application uses SQLAlchemy with the following main models:

- **User**: User accounts and profiles
- **Cycle**: Menstrual cycle records
- **Symptom**: Symptom tracking with severity
- **Ovulation**: Ovulation tracking data
- **Notification**: Scheduled notifications

## AI Integration

The app integrates with Google Gemini API for:
- Cycle pattern analysis
- Health insights generation
- Natural language chat about menstrual health

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS middleware for cross-origin requests
- Input validation with Pydantic models

## Free Tier Optimizations

- Automatic database connection pooling
- Efficient query patterns
- Minimal resource usage
- Sleep-friendly for free hosting tiers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please create a GitHub issue or refer to the API documentation at `/docs` endpoint.
