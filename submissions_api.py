from flask import Flask, request, jsonify, send_file
import base64
import os

app = Flask(__name__)

# Save submitted image to file system
@app.route('/submit-image', methods=['POST'])
def submit_image():
    # Decode base64-encoded image data
    img_data = request.form['image'].split(',')[1].encode()
    img_binary = base64.decodebytes(img_data)

    # Generate unique filename
    file_name = str(hash(img_data)) + '.png'
    file_path = os.path.join('images', file_name)

    # Save image to file system
    with open(file_path, 'wb') as f:
        f.write(img_binary)

    return jsonify({'message': 'Image saved successfully!', 'filename': file_name})

# Retrieve image from file system
@app.route('/get-image/<filename>', methods=['GET'])
def get_image(filename):
    file_path = os.path.join('images', filename)
    if not os.path.isfile(file_path):
        return jsonify({'error': 'File not found!'})
    return send_file(file_path, mimetype='image/png')

# Get all submissions
@app.route('/get-submissions', methods=['GET'])
def get_submissions():
    submissions = []
    for filename in os.listdir('images'):
        if filename.endswith('.png'):
            submissions.append({'filename': filename})
    return jsonify(submissions)

if __name__ == '__main__':
    app.run(debug=True)
