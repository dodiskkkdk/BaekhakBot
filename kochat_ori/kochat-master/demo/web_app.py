
import matplotlib
matplotlib.use('Agg')


from kochat.app import KochatApi
from kochat.data import Dataset
from kochat.loss import CRFLoss, CosFace, CenterLoss, COCOLoss, CrossEntropyLoss
from kochat.model import intent, embed, entity
from kochat.proc import DistanceClassifier, GensimEmbedder, EntityRecognizer, SoftmaxClassifier


from flask import render_template

import application


@application.kochat.app.route('/')
def index():
    return render_template("index.html")


if __name__ == '__main__':
    application.kochat.app.template_folder = application.kochat.root_dir + 'templates'
    application.kochat.app.static_folder = application.kochat.root_dir + 'static'
    application.kochat.app.run(port=9080, host='127.0.0.1')
