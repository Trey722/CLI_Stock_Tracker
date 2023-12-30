from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS


import yfiananceCalls

app = Flask(__name__)
CORS(app)
api = Api(app)



    
    
class helloWorld(Resource):
    def get(self):
        return {'message': "HelloWorld"}

    

class StockPrice(Resource):
    def get(self, symbol):
        success, price = yfiananceCalls.get_stock_price_using_hist(symbol)
        up = ""
        if success:
            succues2, price2 = yfiananceCalls.get_open_stock_price(symbol)
            if succues2:
                if (price > price2):
                    up = "postive"
                else:
                    up = "negative"

            
        return {'success': success, 'symbol': symbol, 'price': float(price) if success else 0.0, 'class': up}
    


api.add_resource(StockPrice, '/stock_price/<string:symbol>') 




api.add_resource(helloWorld, "/")

api.add_resource

if __name__ == '__main__':
    app.run(debug=True)


