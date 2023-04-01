from flask import Flask
from flask import request
import generate

app = Flask(__name__)

@app.route("/image")
def image():
    seed = request.args.get('seed')
    print("akudshflaskjdfhsalkjfhsdakjhdslakjfhsdlkjfdhl")
    print(seed)
    generate.generate_images('network-snapshot-000420.pkl', [int(seed)], 0.3, 'random', '../public', None, None)
    return "IMAGE_GENERATED"

if __name__ == "__main__":
    app.run(debug=True)