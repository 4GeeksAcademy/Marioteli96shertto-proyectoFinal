"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    check_user = User.query.filter_by(email=email).first()

    if check_user is None:
        return jsonify({"msg":  "user doesn't exist"}),404
    
    if email != check_user.email or password != check_user.password:
        return jsonify({"msg": "password incorrect"}),401
    
    access_token = create_access_token(identity=check_user.id)
    return jsonify({"access_token" : access_token}),200

@api.route('/registre', methods=['POST'])
def signup():
    email =  request.json.get("email",None)
    password = request.json.get("password",None)
    user_exist = User.query.filter_by(email=email).first()

    if user_exist is None:
        new_user= User(email=email,password=password,is_active=True)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg" : "user confirmed"}),200
    else :
        return jsonify({"msg" : "user already exists"}),400

   
@api.route('/users', methods=['GET'])
def get_all_users():

    users = User.query.all()
    

    return jsonify([user.serialize()for user in users])


# Protege una ruta con jwt_required, bloquea las peticiones sin un JWT válido
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id }), 200







    



