# %% [markdown]
# # Bushra Amjad - i212083@nu.edu.pk
# 
# ## NLP Assignment 4 - Fake News Detection

# %% [markdown]
# This file contains the following parts (Sections)
# 
# Training
# 1.   Data preprocessing helping functions
# 2.   Loading Training Dataset for **Naive Bayes** and **Binary Naive bayes with Stopwords** and **Binary Naive bayes with Stopwords**
# 3.   **Naive Bayes Classifier**
# 4.   **Binary Naive Bayes Classifier with stopwords**
# 5.   **Binary Naive Bayes Classifier without stopwords**
# 
# Testing
# 1. Loading Test Dataset for **Naive Bayes**, **Binary Naive bayes with Stopwords** and **Binary Naive bayes with Stopwords**
# 2. Testing the working of Models
# 3. **Classification Report**
# 4. **Results**
# 
# 
# 
# 

# %%
import glob
import sys
import math
import re
import spacy
from collections import Counter
from sklearn.metrics import classification_report
unlp = spacy.blank('ur')

# %% [markdown]
# ## Data preprocessing helping functions

# %%
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

# %%
def remove_duplicate_words(string):
        x = string.split()
        x = sorted(set(x), key = x.index)
        return ' '.join(x)

# %%
#convertion of text into words
def words(text): 
  return re.findall(r'\w+', text)

# %% [markdown]
# ## Loading Training Dataset for **Naive Bayes** and **Binary Naive bayes with Stopwords**

# %% [markdown]
# 
# 
# **1.   Fake news**
# 
# 

# %%
FakeNews_list = []

for filename in sorted(glob.glob("C:\\Users\\saimdev\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\data\\Train\Fake\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()
      sentence = unlp(i)
      news =  ''
      for word in sentence:

        #remove punctuation
        word = removePunctuation(word)
        news += word + ' '
       
      FakeNews_list.append(news) 
    f.close()


# %%
#FakeNews_list

# %% [markdown]
# 
# **2.   Real news**
# 
# 

# %%
RealNews_list = []

for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Train\\Real\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()
      sentence = unlp(i)
      news =  ''
      for word in sentence:

        #remove punctuation
        word = removePunctuation(word)
        news += word + ' '
       
      RealNews_list.append(news)  
    f.close()


# %%
#RealNews_list

# %% [markdown]
# **Merging Fake and Real news**

# %%
AllNews_list =  FakeNews_list + RealNews_list

# %%
#print(len(FakeNews_list))
#print(len(RealNews_list))
#print(len(AllNews_list))

# %% [markdown]
# **Counting words in combined set of Fake and Real news after removing duplicates (V)**
# 
# 

# %%
#Converting complete list of news into a single string

Allnews = ''
for news in AllNews_list:
  Allnews += news

# %%
#counting words after removing duplicate words from the news string
vocab = list(unlp(remove_duplicate_words(Allnews)))
V = len(vocab)
#V

# %% [markdown]
# **Calculation of prior[c] where c = [real, fake]**

# %%
# Fake and real news count
fake_NewsCount = len(FakeNews_list)
real_NewsCount = len(RealNews_list)
N = fake_NewsCount + real_NewsCount

#print(fake_NewsCount)
#print(real_NewsCount)
#N

# %%
prior = {}
prior['real'] = real_NewsCount/N
prior['fake'] = fake_NewsCount/N
#prior

# %% [markdown]
# # **Naive Bayes classifer**

# %% [markdown]
# 
# *   Counting words in Fake and Real news seperately **Without** removing duplicates **(Nw)**
# 
# 
# 
# 
# 
# 

# %%
#Fake news
Fakenews = ''
for news in FakeNews_list:
  Fakenews += news

Fakenews_vocab_count = len(unlp(Fakenews))
#Fakenews_vocab_count

# %%
#Real news
Realnews = ''
for news in RealNews_list:
  Realnews += news

Realnews_vocab_count = len(unlp(Realnews))
#Realnews_vocab_count

# %% [markdown]
# 
# 
# *   Calculating number of occurances of each word in fake and real news list **Without** removing duplicates from each news **(Ni)**
# 
# 

# %%
#Fake news
Fakenews_Ni = ''
for news in FakeNews_list:
  Fakenews_Ni += news

Fakenews_Ni = Counter(words(Fakenews_Ni))
#Fakenews_Ni

# %%
#Real news
Realnews_Ni = ''
for news in RealNews_list:
  Realnews_Ni += news

Realnews_Ni = Counter(words(Realnews_Ni))
#Realnews_Ni

# %% [markdown]
# **Calculating Conditional probability of each word present in Vocabulary with simple Naive Bayes clasifier**
# 
# 
# ![image.png](data:image/png;base64,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) using this equation

# %%
Fake_condProb_NB = {}
Real_condProb_NB = {}

for word in vocab:
  word = str(word)

  prob_f = (Fakenews_Ni[word] + 1)/(Fakenews_vocab_count + V)
  Fake_condProb_NB[word] = prob_f

  prob_r = (Realnews_Ni[word] + 1)/(Realnews_vocab_count + V)
  Real_condProb_NB[word] = prob_r
  

# %%
#print(Fake_condProb_NB['عمران'])
#print(Real_condProb_NB['عمران'])

# %% [markdown]
# # **Boolean Naive Bayes classifer with stop words**

# %% [markdown]
# 
# *  Counting words in Fake and Real news seperately **After** removing duplicates **(Nw)**
# 
# 

# %%
#Fake news
Fakenews = ''
for news in FakeNews_list:
  Fakenews += remove_duplicate_words(news)

Fakenews_vocab_count = len(unlp(Fakenews))
#Fakenews_vocab_count

# %%
#Real news
Realnews = ''
for news in RealNews_list:
  Realnews += remove_duplicate_words(news)

Realnews_vocab_count = len(unlp(Realnews))
#Realnews_vocab_count

# %% [markdown]
# 
# *   Calculating number of occurances of each word in fake and real news list **After** removing duplicates from each news **(Ni)**
# 
# 
# 
# 
# 

# %%
#Real news
Fakenews_Ni = ''
for news in FakeNews_list:
  Fakenews_Ni += remove_duplicate_words(news)

Fakenews_Ni = Counter(words(Fakenews_Ni))
#Fakenews_Ni

# %%
#Fake news
Realnews_Ni = ''
for news in RealNews_list:
  Realnews_Ni += remove_duplicate_words(news)

Realnews_Ni = Counter(words(Realnews_Ni))
#Realnews_Ni

# %% [markdown]
# **Calculating Conditional probability of each word present in Vocabulary**
# 
# ![image.png](data:image/png;base64,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) using this equation

# %%
Fake_condProb_with_SW = {}
Real_condProb_with_SW = {}

for word in vocab:
  word = str(word)

  prob_f = (Fakenews_Ni[word] + 1)/(Fakenews_vocab_count + V)
  Fake_condProb_with_SW[word] = prob_f

  prob_r = (Realnews_Ni[word] + 1)/(Realnews_vocab_count + V)
  Real_condProb_with_SW[word] = prob_r
  

# %%
#print(Fake_condProb_with_SW['عمران'])
#print(Real_condProb_with_SW['عمران'])

# %% [markdown]
# # **Boolean Naive Bayes Clasifier without stop words**

# %% [markdown]
# Loading Stop words to remove them from the real and fake news for training and testing

# %%
with open('C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\stopwords-ur.txt', 'r' , encoding='utf-8') as f:
  stop_words = f.read()

# %%
#stop_words

# %% [markdown]
# ## Loading Training Dataset with the removal of stop words

# %% [markdown]
# 
# 
# 1.   **Fake News**
# 
# 

# %%
FakeNews_list = []

for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Train\Fake\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()

      sentence = unlp(i)
      news =  ''
      for word in sentence:
        #remove punctuation
        word = removePunctuation(word)
        
        #remove stop words
        if word not in stop_words:
          news += word + ' '
       
      FakeNews_list.append(news) 
    f.close()

# %%
#FakeNews_list

# %% [markdown]
# 
# 
# 2.   **Real News**
# 
# 

# %%
RealNews_list = []

for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Train\\Real\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()

      sentence = unlp(i)
      news =  ''
      for word in sentence:

        #remove punctuation
        word = removePunctuation(word)

        #remove stop words
        if word not in stop_words:
          news += word + ' '
       
      RealNews_list.append(news)  
    f.close()

# %%
#RealNews_list

# %% [markdown]
# **Merging Fake and Real news**

# %%
AllNews_list =  FakeNews_list + RealNews_list

# %% [markdown]
# Counting words in combined set of Fake and Real news **After** removing duplicates **(V)**

# %%
#Converting complete list of news into a single string
Allnews = ''
for news in AllNews_list:
  Allnews += news

# %%
#counting words after removing duplicate words from the news string
vocab = list(unlp(remove_duplicate_words(Allnews)))
V = len(vocab)
#V

# %% [markdown]
# 
# 
# 
# *   Counting words in Fake and Real news seperately **After** removing duplicates **(Nw)**
# 
# 

# %%
Fakenews = ''
for news in FakeNews_list:
  Fakenews += remove_duplicate_words(news)

Fakenews_vocab_count = len(unlp(Fakenews))
Fakenews_vocab_count

# %%
Realnews = ''
for news in RealNews_list:
  Realnews += remove_duplicate_words(news)

Realnews_vocab_count = len(unlp(Realnews))
#Realnews_vocab_count

# %% [markdown]
# 
# *   Calculating number of occurances of each word in fake and real news list **After** removing duplicates from each news **(Ni)**
# 

# %%
#Fake news
Fakenews_Ni = ''
for news in FakeNews_list:
  Fakenews_Ni += remove_duplicate_words(news)

Fakenews_Ni = Counter(words(Fakenews_Ni))
#Fakenews_Ni

# %%
#Feal news
Realnews_Ni = ''
for news in RealNews_list:
  Realnews_Ni += remove_duplicate_words(news)

Realnews_Ni = Counter(words(Realnews_Ni))
#Realnews_Ni

# %% [markdown]
# **Calculating Conditional probability of each word present in Vocabulary**
# 
# ![image.png](data:image/png;base64,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) using this equation

# %%
Fake_condProb_without_SW = {}
Real_condProb_without_SW = {}

for word in vocab:
  word = str(word)

  prob_fake = (Fakenews_Ni[word] + 1)/(Fakenews_vocab_count + V)
  Fake_condProb_without_SW[word] = prob_fake

  prob_real = (Realnews_Ni[word] + 1)/(Realnews_vocab_count + V)
  Real_condProb_without_SW[word] = prob_real
  

# %%
#print(Fake_condProb_without_SW['عمران'])
#print(Real_condProb_without_SW['عمران'])

# %% [markdown]
# # **Testing**

# %% [markdown]
# **Label assigned to each news**
# 
# NB = Naive Bayes
# 
# BNB = Binary Naive Bayes
# 
# SW = Stop words
# 

# %%
y_true_NB = []
y_true_BNB_without_SW = []
y_true_BNB_with_SW = []

# %% [markdown]
# **Loading Test set for Naive bayes Clasifier**

# %%
#Fake news

News = []
for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Test\\Fake\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()

      sentence = unlp(i)
      news =  ''
      for word in sentence:
        word = removePunctuation(word)
        news += word + ' '
       
      News.append(news) 
      y_true_NB.append('fake')

    f.close()

#Real news
for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Test\\Real\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()
      
      sentence = unlp(i)
      news =  ''
      for word in sentence:
        word = removePunctuation(word)
        news += word + ' '
       
      News.append(news) 
      y_true_NB.append('real')

    f.close()

# %% [markdown]
# **Loading Test set for Binary Naive bayes Clasifier with Stop words**

# %%
#Fake news

News = []
for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Test\\Fake\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()

      sentence = unlp(i)
      news =  ''
      for word in sentence:
        word = removePunctuation(word)
        news += word + ' '

      news = remove_duplicate_words(news) 
      News.append(news) 
      y_true_BNB_with_SW.append('fake')

    f.close()

#Real news
for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Test\\Real\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()
      
      sentence = unlp(i)
      news =  ''
      for word in sentence:
        word = removePunctuation(word)
        news += word + ' '

      news = remove_duplicate_words(news) 
      News.append(news) 
      y_true_BNB_with_SW.append('real')

    f.close()

# %% [markdown]
# **Loading Test set for Binary Naive bayes Clasifier without Stop words**

# %%
#Fake news

News = []
for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Test\\Fake\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()

      sentence = unlp(i)
      news =  ''
      for word in sentence:
        word = removePunctuation(word)
        if word not in stop_words:
          news += word + ' '
       
      news = remove_duplicate_words(news)
      News.append(news) 
      y_true_BNB_without_SW.append('fake')

    f.close()

#Real news
for filename in sorted(glob.glob("C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\Test\\Real\\*.txt")):
    with open(filename, 'r', encoding='utf-8') as f:
      i = f.read()
      
      sentence = unlp(i)
      news =  ''
      for word in sentence:
        word = removePunctuation(word)
        if word not in stop_words:
          news += word + ' '
       
      news = remove_duplicate_words(news)
      News.append(news) 
      y_true_BNB_without_SW.append('real')

    f.close()

# %% [markdown]
# **These functions will calculate the probabilty of each word in test news and return real or fake using argmax**
# 
# 
# 
# 1.   **predict_NB** = Prediction of Real and Fake news with Naive Bayes Classifier
# 2.   **predict_BNB_without_SW** = Prediction of Real and Fake news with Binary Naive Bayes Classifier without Stopwords
# 3. **predict_BNB_with_SW** = Prediction of Real and Fake news with Binary Naive Bayes Classifier with Stopwords
# 
# 
# 
# 
# 
# 
# 
# 
# 

# %%
#Naive Bayes
def predict_single_NB(news):
  C = ['real', 'fake']
  score = {}
  nlp = spacy.load("en_core_web_sm")
  doc = nlp(news_article)
  words = [removePunctuation(word) for word in doc]

  for c in C:
    score[c] = math.log(prior[c])
    for word in words:
      if c == 'real':
        if word in Real_condProb_NB:
          score[c] += math.log(Real_condProb_NB[word])
      elif c == 'fake':
        if word in Fake_condProb_NB:
          score[c] += math.log(Fake_condProb_NB[word])
    
  result = max(score, key=score.get)
  return result



# %%
#Binary Naive Bayes without stopwords
def predict_BNB_without_SW(news):

  C = ['real','fake']
  score = {}
 
  for c in C:
    score[c] = math.log(prior[c])
    
    for word in news:
      if c == 'real':
        if word in Real_condProb_NB:
          score[c] += math.log(Real_condProb_without_SW[word])

      elif c == 'fake':
        if word in Fake_condProb_NB:
          score[c] += math.log(Fake_condProb_without_SW[word])

  result = max(score, key = score.get)
  y_pred_BNB_without_SW.append(result)

  if result == 'real':
    r['real'] += 1
  elif result == 'fake':
    r['fake'] += 1

# %%
#Binary Naive bayes with stop words
def predict_BNB_with_SW(news):

  C = ['real','fake']
  score = {}
 
  for c in C:
    score[c] = math.log(prior[c])
    
    for word in news:
      if c == 'real':
        if word in Real_condProb_NB:
          score[c] += math.log(Real_condProb_with_SW[word])

      elif c == 'fake':
        if word in Fake_condProb_NB:
          score[c] += math.log(Fake_condProb_with_SW[word])

  result = max(score, key = score.get)
  y_pred_BNB_with_SW.append(result)

  if result == 'real':
    r['real'] += 1
  elif result == 'fake':
    r['fake'] += 1

# %% [markdown]
# ## **Testing the final working of the Model**

# %% [markdown]
# 
# 1.   **Naive Bayes**
# 
# 

# %%
news_article = sys.argv[1]
predicted_class = predict_single_NB(news_article)
print(predicted_class)


# %% [markdown]
# 
# 2.   **Binary Naive Bayes without Stopwords**
# 
# 

# %%
y_pred_BNB_without_SW = []

r = {'real':0, 'fake':0}

for news in News:
  sentence = unlp(news)
  news = []
  for word in sentence:
    word = removePunctuation(word)
    news.append(word)

  predict_BNB_without_SW(news)

#print(r)

# %% [markdown]
# 
# 
# 
# 3.   **Binary Naive Bayes with Stopwords**
# 
# 

# %%
y_pred_BNB_with_SW = []

r = {'real':0, 'fake':0}

for news in News:
  sentence = unlp(news)
  news = []
  for word in sentence:
    word = removePunctuation(word)
    news.append(word)

  predict_BNB_with_SW(news)

#print(r)

# %% [markdown]
# # **Classification Report**

# %%
target_names = ['real', 'fake']

# %% [markdown]
# 1. Classification report for **Naive Bayes**

# %%
#naive_bayes= classification_report(y_true_NB, y_pred_NB, target_names=target_names)
##print(naive_bayes)

# %% [markdown]
# 1. Classification report for **Binary Naive Bayes without Stopwords**

# %%
#print(classification_report(y_true_BNB_without_SW, y_pred_BNB_without_SW, target_names=target_names))

# %% [markdown]
# 1. Classification report for **Binary Naive Bayes with Stopwords**

# %%
#print(classification_report(y_true_BNB_with_SW, y_pred_BNB_with_SW, target_names=target_names))

# %% [markdown]
# **Results**
# 
# We can clearly see that Boolean Naive Bayes improves our performance as compared to simple Naive Bayes Classifier
# 
# 
# 
# 1.   Naive Bayes = 75%
# 2.   Binary Naive Bayes with stopwords = 76%
# 3. Binary Naive Bayes with stopwords = 77%
# 
# 

# %%



