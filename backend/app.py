
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from datetime import datetime

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
        
        # Validate required fields
        required_fields = ["teamName", "collegeName", "teamLeaderName", "teamLeaderEmail"]
        if not all(field in data and data[field] for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Add registration timestamp
        data["registrationDate"] = datetime.utcnow().isoformat()
        
        # Format data for MongoDB
        registration_data = {
            # Personal Info
            "firstName": data.get("firstName", ""),
            "lastName": data.get("lastName", ""),
            "email": data.get("email", ""),
            "phone": data.get("phone", ""),
            
            # Team Details
            "teamName": data.get("teamName", ""),
            "collegeName": data.get("collegeName", ""),
            "numberOfMembers": data.get("numberOfMembers", 1),
            "teamLeaderName": data.get("teamLeaderName", ""),
            "teamLeaderEmail": data.get("teamLeaderEmail", ""),
            
            # Member Details
            "members": [
                {
                    "name": data.get("member1Name", ""),
                    "email": data.get("member1Email", "")
                }
            ],
            "problemStatement": data.get("problemStatement", ""),
            "registrationDate": data.get("registrationDate", ""),
            "status": "pending"  # Initial status
        }
        
        # Add member 2 if provided
        if data.get("member2Name") and data.get("member2Email"):
            registration_data["members"].append({
                "name": data.get("member2Name", ""),
                "email": data.get("member2Email", "")
            })
        
        # Insert data into MongoDB
        inserted_id = collection.insert_one(registration_data).inserted_id
        
        return jsonify({
            "message": "Registration successful!",
            "id": str(inserted_id)
        }), 201

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the API is running"""
    return jsonify({"status": "healthy", "message": "API is running"}), 200

@app.route('/registrations', methods=['GET'])
def get_registrations():
    """Get all registrations (for admin purposes, would need authentication in production)"""
    try:
        # In a real app, this would be protected by authentication
        registrations = list(collection.find({}, {'_id': 0}))
        return jsonify({"registrations": registrations}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Use environment variable for port if available (for cloud deployment)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
