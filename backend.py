from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Store messages in a file for simplicity
MESSAGE_FILE = 'messages.json'

# Helper function to read messages from the file
def read_messages():
    try:
        with open(MESSAGE_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Helper function to write messages to the file
def write_messages(messages):
    with open(MESSAGE_FILE, 'w') as file:
        json.dump(messages, file)

@app.route('/get_messages', methods=['GET'])
def get_messages():
    """ Return the list of messages """
    messages = read_messages()
    return jsonify(messages)

@app.route('/send_message', methods=['POST'])
def send_message():
    """ Add a new message to the list """
    data = request.get_json()
    messages = read_messages()

    new_message = {
        'user': data['user'],
        'message': data['message']
    }
    messages.append(new_message)
    write_messages(messages)
    return jsonify({'status': 'Message sent successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)

    
