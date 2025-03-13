
# AgentX Hackathon Registration Backend

This is the backend API for the AgentX Hackathon Registration system. It handles participant registrations and stores them in MongoDB Atlas.

## Setup Instructions

1. Make sure you have Python 3.7+ installed
2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. MongoDB connection is configured with:
```
mongodb+srv://agentx:agentx@registration-agentx.3kg3s.mongodb.net/?retryWrites=true&w=majority&appName=Registration-AgentX
```

## Running the Backend

In development mode:
```bash
python app.py
```

The backend will start on port 5000 by default.

## API Endpoints

- **POST /register**: Register a team for the hackathon
- **GET /health**: Health check endpoint
- **GET /registrations**: Admin endpoint to view all registrations

## Testing the API

You can test the API with tools like Postman or curl:

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "teamName": "Team Example",
    "collegeName": "Example University",
    "teamLeaderName": "John Doe",
    "teamLeaderEmail": "john@example.com"
  }'
```

## Deployment

For production deployment, the app is ready to be deployed to platforms like Heroku, Railway, or any other service that supports Python applications.
