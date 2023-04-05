from flask import Flask
from flask import request
import generate

app = Flask(__name__)
@app.route("/image")
def image():
    seed = request.args.get('seed')
    noise = request.args.get('noise')
    psi = request.args.get('psi')
    if noise == 'true':
        noise = 'random'     
    else:
        noise = 'none'    
    generate.generate_images('network-snapshot-000420.pkl', [int(seed)], float(psi), noise, '../public', None, None)
    return "IMAGE SUCCESSFULLY GENERATED"
if __name__ == "__main__":
    app.run(debug=True, port=7000, exclude_patterns=['*'])