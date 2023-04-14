from flask import Flask
from flask import request
import json
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

@app.route("/favorite")
def favorite():
    currentSeed=request.args.get('seed')
    currentPsi=request.args.get('psi')
    delete = request.args.get('delete')
    changeJson(currentSeed, currentPsi, delete)
    return "JSON SUCCESSFULLY CHANGED"

@app.route("/getFavorite")
def getFavorite():
    with open('../src/favorite.json') as f:
        favData = json.load(f)
    f.close()

    return favData

def changeJson(seed, psi, delete):
    img = {"seed": int(seed), "psi": float(psi)}
    with open('../src/favorite.json') as f:
        favData = json.load(f)

    if delete == 'false':
        if img not in favData:
            favData.append(img)
    else:
        for idx, image in enumerate(favData):
            if image['seed'] == int(seed) and image['psi'] == float(psi):
                favData.pop(idx)

    with open('../src/favorite.json','w') as f:
        json.dump(favData,f,indent=2)

    f.close()    

if __name__ == "__main__":
    app.run(debug=True, port=7000, exclude_patterns=['*'])