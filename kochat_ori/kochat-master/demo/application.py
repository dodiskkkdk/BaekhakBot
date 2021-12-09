"""
@auther Hyunwoong
@since 7/1/2020
@see https://github.com/gusdnd852
"""
import sys
#sys.path.append('c:\cap_bak')

import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt

from flask import render_template

from kochat.app import KochatApi
from kochat.data import Dataset
from kochat.loss import CRFLoss, CosFace, CenterLoss, COCOLoss, CrossEntropyLoss
from kochat.model import intent, embed, entity
from kochat.proc import DistanceClassifier, GensimEmbedder, EntityRecognizer, SoftmaxClassifier

#from demo.scenario import dust, weather, travel, restaurant, school
from scenario import dust, weather, travel, restaurant, school

# 에러 나면 이걸로 실행해보세요!


dataset = Dataset(ood=True)
emb = GensimEmbedder(model=embed.FastText())

clf = DistanceClassifier(
    model=intent.CNN(dataset.intent_dict),
    loss=CenterLoss(dataset.intent_dict),
)

rcn = EntityRecognizer(
    model=entity.LSTM(dataset.entity_dict),
    loss=CRFLoss(dataset.entity_dict)
)

kochat = KochatApi(
    dataset=dataset,
    embed_processor=(emb, True),
    intent_classifier=(clf, True),
    entity_recognizer=(rcn, True),
    scenarios=[
        weather, dust, travel, restaurant, school
    ]
)



