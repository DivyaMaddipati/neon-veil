
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
import os
import json
from datetime import datetime
import bcrypt
import jwt
from functools import wraps
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Allow cross-origin requests with credentials
app.secret_key = "agentx-hackathon-secret-key"  # Used for JWT signing

# JWT configuration
JWT_SECRET = "agentx-jwt-secret-key"
JWT_EXPIRATION = 24 * 60 * 60  # 24 hours in seconds

# MongoDB Atlas Connection
MONGO_URI = "mongodb+srv://agentx:agentx@registration-agentx.3kg3s.mongodb.net/?retryWrites=true&w=majority&appName=Registration-AgentX"
client = MongoClient(MONGO_URI)
db = client.registrationDB  # Database Name
collection = db.registrations  # Collection Name
users_collection = db.users  # Users Collection

# Load admin credentials from JSON file
admin_file_path = os.path.join(os.path.dirname(__file__), 'admin_credentials.json')
try:
    with open(admin_file_path, 'r') as file:
        admin_credentials = json.load(file)
except FileNotFoundError:
    # Create default admin credentials if file doesn't exist
    admin_credentials = {
        "admins": [
            {
                "email": "admin@agentx.com",
                "password": "admin123"
            }
        ]
    }
    # Save default admin credentials
    with open(admin_file_path, 'w') as file:
        json.dump(admin_credentials, file, indent=4)

# Create token for user or admin
def create_token(user_id, is_admin=False):
    payload = {
        "user_id": user_id,
        "is_admin": is_admin,
        "exp": datetime.utcnow().timestamp() + JWT_EXPIRATION
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return token

# Token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
            
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user = payload
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
            
        return f(*args, **kwargs)
    
    return decorated

# Admin required decorator
def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not request.user.get('is_admin', False):
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    
    return decorated

@app.route('/check-email', methods=['POST'])
def check_email():
    """Check if an email is already registered"""
    try:
        data = request.json
        email = data.get('email')
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
            
        # Check if the email exists in users collection
        existing_user = users_collection.find_one({"email": email})
        
        if existing_user:
            return jsonify({"error": "Email already registered"}), 409
            
        return jsonify({"message": "Email is available"}), 200
        
    except Exception as e:
        print(f"Error checking email: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/register', methods=['POST'])
@token_required
def register():
    try:
        data = request.json  # Get JSON data from request
        
        # Validate required fields
        required_fields = ["teamName", "collegeName", "teamLeaderName", "teamLeaderEmail"]
        if not all(field in data and data[field] for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Add registration timestamp
        data["registrationDate"] = datetime.utcnow().isoformat()
        
        # Link to user account
        data["userId"] = request.user.get('user_id')
        
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
            
            # Member Details - Initialize with empty array
            "members": [],
            "problemStatement": data.get("problemStatement", ""),
            "registrationDate": data.get("registrationDate", ""),
            "userId": data.get("userId", ""),
            "status": "pending"  # Initial status
        }
        
        # Add members based on data provided
        if "members" in data and isinstance(data["members"], list):
            registration_data["members"] = data["members"]
        else:
            # Backward compatibility for direct member fields
            if data.get("numberOfMembers", 1) >= 2 and data.get("member1Name") and data.get("member1Email"):
                registration_data["members"].append({
                    "name": data.get("member1Name", ""),
                    "email": data.get("member1Email", "")
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

@app.route('/team-profile', methods=['GET'])
@token_required
def get_team_profile():
    """Get the team profile for the logged in user"""
    try:
        # Get user ID from token
        user_id = request.user.get('user_id')
        
        # Find team registration for this user
        team = collection.find_one({"userId": user_id})
        
        if not team:
            return jsonify({"message": "No team registration found for this user"}), 404
            
        # Convert ObjectId to string for JSON serialization
        if '_id' in team:
            team['_id'] = str(team['_id'])
            
        return jsonify({"team": team}), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        
        # Validate required fields
        if not all(field in data for field in ["email", "password", "firstName", "lastName"]):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Check if user already exists
        existing_user = users_collection.find_one({"email": data["email"]})
        if existing_user:
            return jsonify({"error": "Email already registered"}), 409
        
        # Hash password
        hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())
        
        # Create user object
        user = {
            "email": data["email"],
            "password": hashed_password.decode('utf-8'),
            "firstName": data["firstName"],
            "lastName": data["lastName"],
            "createdAt": datetime.utcnow().isoformat(),
            "role": "user"
        }
        
        # Insert user into database
        result = users_collection.insert_one(user)
        
        # Create token
        token = create_token(str(result.inserted_id), is_admin=False)
        
        return jsonify({
            "message": "User registered successfully",
            "token": token,
            "user": {
                "email": user["email"],
                "firstName": user["firstName"],
                "lastName": user["lastName"],
                "role": "user"
            }
        }), 201
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        
        if not data or not data.get("email") or not data.get("password"):
            return jsonify({"error": "Email and password are required"}), 400
        
        # Check if user exists
        user = users_collection.find_one({"email": data["email"]})
        
        if user and bcrypt.checkpw(data["password"].encode('utf-8'), user["password"].encode('utf-8')):
            # Create token
            token = create_token(str(user["_id"]), is_admin=False)
            
            return jsonify({
                "message": "Login successful",
                "token": token,
                "user": {
                    "email": user["email"],
                    "firstName": user.get("firstName", ""),
                    "lastName": user.get("lastName", ""),
                    "role": "user"
                }
            }), 200
        
        return jsonify({"error": "Invalid email or password"}), 401
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/admin/login', methods=['POST'])
def admin_login():
    try:
        data = request.json
        
        if not data or not data.get("email") or not data.get("password"):
            return jsonify({"error": "Email and password are required"}), 400
        
        # Check admin credentials - simple string comparison for passwords
        for admin in admin_credentials.get("admins", []):
            if admin["email"] == data["email"] and admin["password"] == data["password"]:
                # Create admin token
                token = create_token(admin["email"], is_admin=True)
                
                return jsonify({
                    "message": "Admin login successful",
                    "token": token,
                    "user": {
                        "email": admin["email"],
                        "role": "admin"
                    }
                }), 200
        
        return jsonify({"error": "Invalid admin credentials"}), 401
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the API is running"""
    return jsonify({"status": "healthy", "message": "API is running"}), 200

@app.route('/user', methods=['GET'])
@token_required
def get_user_profile():
    """Get the current user's profile"""
    try:
        if request.user.get('is_admin', False):
            # For admin users
            for admin in admin_credentials.get("admins", []):
                if admin["email"] == request.user.get('user_id'):
                    return jsonify({
                        "email": admin["email"],
                        "role": "admin"
                    }), 200
            return jsonify({"error": "Admin not found"}), 404
        else:
            # For regular users
            user_id = request.user.get('user_id')
            
            user = users_collection.find_one({"_id": ObjectId(user_id)})
            if not user:
                return jsonify({"error": "User not found"}), 404
                
            return jsonify({
                "email": user["email"],
                "firstName": user.get("firstName", ""),
                "lastName": user.get("lastName", ""),
                "role": "user"
            }), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/registrations', methods=['GET'])
@token_required
@admin_required
def get_registrations():
    """Get all registrations (admin only)"""
    try:
        registrations = list(collection.find({}))
        # Convert ObjectId to string for JSON serialization
        for reg in registrations:
            reg['_id'] = str(reg['_id'])
        return jsonify({"registrations": registrations}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Use environment variable for port if available (for cloud deployment)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
