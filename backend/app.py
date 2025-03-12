from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# MongoDB Atlas Connection
MONGO_URI = "mongodb+srv://agentx:agentx@registration-agentx.3kg3s.mongodb.net/?retryWrites=true&w=majority&appName=Registration-AgentX"
client = MongoClient(MONGO_URI)
db = client.registrationDB  # Database Name
collection = db.registrations  # Collection Name

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json  # Get JSON data from request
        required_fields = ["teamName", "collegeName", "teamLeaderName", "teamLeaderEmail"]
        
        # Check if required fields exist
        if not all(field in data and data[field] for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Insert data into MongoDB
        inserted_id = collection.insert_one(data).inserted_id
        return jsonify({"message": "Registration successful!", "id": str(inserted_id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
