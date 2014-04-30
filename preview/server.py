from flask import Flask
from flask import render_template
import os
import json



def to_json(obj):
    return json.dumps(obj, indent=4)

def removeHidden(fileList):
    return [el for el in fileList if not el.startswith(".")]


def getFolders():
    server_path = os.path.abspath(__file__)
    static_path = server_path.replace("server.py", "static")
    folders = os.listdir(static_path)
    return removeHidden(folders)

def getFolderContents(folderName):
    server_path = os.path.abspath(__file__)
    static_path = server_path.replace("server.py", "static")
    folder_path = os.path.join(static_path, folderName, "images")
    media = removeHidden(os.listdir(folder_path))
    media = [os.path.join("/static", folderName, "images", name) for name in media]
    return media


app = Flask(__name__)

@app.route('/')
def index():
    return to_json(getFolders())

@app.route('/show/<speaker>')
def show(speaker):
    folder = speaker
    contents = getFolderContents(folder)
    return render_template('show.html', name=folder, images=contents)

@app.route('/all')
def all():
    folders = getFolders()
    data = {}
    for folder in folders:
        media = getFolderContents(folder)
        data[folder] = media
    return to_json(data)
    # return render_template('all.html', data=data)



if __name__ == '__main__':
    app.run(debug=True)