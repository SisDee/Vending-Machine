from flask import Flask,request
from flask_cors import CORS
import product_handler
import coin_handler

application = Flask(__name__)
cors = CORS(application)

#just default homepage
@application.route("/")
def home():
    return "home"


#hand request to retrieve all products in the database
@application.route("/products",methods=['GET'])
def get_products():
    handler = product_handler.ProductHandler()
    return handler.get_data()

#handle request for add an item
@application.route("/products/add",methods=['POST'])
def add_product():
    handler = product_handler.ProductHandler()
    return handler.post_data(request.get_json())


#handle request for buying an item
@application.route("/products/purchase",methods=['PATCH'])
def purchase_product():
    handler = product_handler.ProductHandler()
    return handler.update_data(request.get_json())

#handle request for retrieving coins
@application.route("/coins",methods=['GET'])
def get_coins():
    handler = coin_handler.CoinHandler()
    return handler.get_data()

#handle request for retrieving coins
@application.route("/coins/update",methods=['PATCH'])
def update_coins():
    handler = coin_handler.CoinHandler()
    return handler.update_data(request.get_json())


if __name__=="__main__":
    application.run(host='0.0.0.0',debug=False)
