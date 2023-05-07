import logging
from flask import Flask, request, jsonify

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

def convert_to_uppercase(user_input):
    return user_input.upper()

@app.route('/api/convert-to-uppercase', methods=['POST'])
def convert_to_uppercase_view():
    try:
        user_input = request.json['userInput']
        result = convert_to_uppercase(user_input)
        return jsonify({'result': result})
    except Exception as e:
        logging.error(str(e))
        return jsonify({'error': 'An error occurred'})
