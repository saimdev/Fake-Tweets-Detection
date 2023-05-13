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

Realnews_Ni = ''
for news in RealNews_list:
  Realnews_Ni += news

Realnews_Ni = Counter(words(Realnews_Ni))

Fake_condProb_NB = {}
Real_condProb_NB = {}

for word in vocab:
  word = str(word)

  prob_f = (Fakenews_Ni[word] + 1)/(Fakenews_vocab_count + V)
  Fake_condProb_NB[word] = prob_f

  prob_r = (Realnews_Ni[word] + 1)/(Realnews_vocab_count + V)
  Real_condProb_NB[word] = prob_r
  
Fakenews = ''
for news in FakeNews_list:
  Fakenews += remove_duplicate_words(news)

Fakenews_vocab_count = len(unlp(Fakenews))

Realnews = ''
for news in RealNews_list:
  Realnews += remove_duplicate_words(news)

Realnews_vocab_count = len(unlp(Realnews))

Fakenews_Ni = ''
for news in FakeNews_list:
  Fakenews_Ni += remove_duplicate_words(news)

Fakenews_Ni = Counter(words(Fakenews_Ni))

Realnews_Ni = ''
for news in RealNews_list:
  Realnews_Ni += remove_duplicate_words(news)

Realnews_Ni = Counter(words(Realnews_Ni))

Fake_condProb_with_SW = {}
Real_condProb_with_SW = {}

for word in vocab:
  word = str(word)

  prob_f = (Fakenews_Ni[word] + 1)/(Fakenews_vocab_count + V)
  Fake_condProb_with_SW[word] = prob_f

  prob_r = (Realnews_Ni[word] + 1)/(Realnews_vocab_count + V)
  Real_condProb_with_SW[word] = prob_r
  
with open('C:\\Users\\saimdev\\Documents\\Fake-Tweets-Detection-master\\Fake-Tweets-Detection-master\\pythonCode\\data\\stopwords-ur.txt', 'r' , encoding='utf-8') as f:
  stop_words = f.read()


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

AllNews_list =  FakeNews_list + RealNews_list

Allnews = ''
for news in AllNews_list:
  Allnews += news

vocab = list(unlp(remove_duplicate_words(Allnews)))
V = len(vocab)

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




Fakenews_Ni = ''
for news in FakeNews_list:
  Fakenews_Ni += remove_duplicate_words(news)

Fakenews_Ni = Counter(words(Fakenews_Ni))

Realnews_Ni = ''
for news in RealNews_list:
  Realnews_Ni += remove_duplicate_words(news)

Realnews_Ni = Counter(words(Realnews_Ni))


Fake_condProb_without_SW = {}
Real_condProb_without_SW = {}

for word in vocab:
  word = str(word)

  prob_fake = (Fakenews_Ni[word] + 1)/(Fakenews_vocab_count + V)
  Fake_condProb_without_SW[word] = prob_fake

  prob_real = (Realnews_Ni[word] + 1)/(Realnews_vocab_count + V)
  Real_condProb_without_SW[word] = prob_real
  

#Binary Naive bayes with stop words
news = sys.argv[1]
C = ['real', 'fake']
score = {}
nlp = spacy.load("en_core_web_sm")
doc = nlp(news)
words = [removePunctuation(word) for word in doc]

for c in C:
    score[c] = math.log(prior[c])

    for word in words:
        if c == 'real':
            if word in Real_condProb_NB:
                score[c] += math.log(Real_condProb_with_SW[word])
        elif c == 'fake':
            if word in Fake_condProb_NB:
                score[c] += math.log(Fake_condProb_with_SW[word])

result = max(score, key=score.get)
print(result)





