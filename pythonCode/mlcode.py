import glob
import math
import re
import spacy
from collections import Counter
from sklearn.metrics import classification_report
unlp = spacy.blank('ur')

def removePunctuation(word):
        word = word.text
        word = word.replace('\\r\\/','')
        word = word.replace(',','')
        word = word.replace('?','')
        word = word.replace('\n','')
        word = word.replace('\\n','')
        word = word.replace('٪','')
        word = word.replace('،','')
        word = word.replace('؟','')
        word = word.replace('!','')
        word = word.replace('ء','')
        word = word.replace('“','')
        word = word.replace('\\n\\/','')
        word = word.replace('۔','')
        word = word.replace('.','')
        word = word.replace(':','')
        word = word.replace('(','')
        word = word.replace(')','')
        word = word.replace('‘','')
        word = word.replace('’','')
        word = word.replace(' ','')
        word = word.replace('\ufeff','')
        return word

print("SAIM")