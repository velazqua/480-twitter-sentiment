import fix_path
from ttwython.twython import Twython
from datumbox import DatumBox
import os
import cgi
import urllib
import datetime

from google.appengine.api import users
from google.appengine.api import urlfetch
from google.appengine.ext import ndb

import webapp2
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

def getKeys (filename):
  fin = open(filename, "r")
  keys = []
  lines = fin.readlines()
  for api_key in lines:
    k = api_key.split("=")
    keys.append(k[1].rstrip())
  return keys[0], keys[1], keys[2]

def get_access_token (APP_KEY, APP_SECRET):
  return Twython(APP_KEY, APP_SECRET, oauth_version=2).obtain_access_token()

APP_KEY, APP_SECRET, DATUMBOX_API_KEY = getKeys("api_keys.dat")

# Twitter Wrapper API calls
ACCESS_TOKEN = get_access_token(APP_KEY, APP_SECRET)
twitter = Twython(APP_KEY, access_token=ACCESS_TOKEN)

# DatumBox Wrapper API calls
datum_box = DatumBox.DatumBox(DATUMBOX_API_KEY)

class Query (ndb.Model):
  user = ndb.UserProperty()
  text = ndb.StringProperty(indexed=False)
  date = ndb.DateTimeProperty(auto_now_add=True)

class Result (ndb.Model):
  user = ndb.StringProperty(indexed=False)
  text = ndb.StringProperty(indexed=False)
  bg_color = ndb.StringProperty(indexed=False)

class MainPage(webapp2.RequestHandler):
  def get(self):
    user = users.get_current_user()
    if user:
      url = users.create_logout_url(self.request.uri)
      url_linktext = 'Logout'
    else:
      url = users.create_login_url(self.request.uri)
      url_linktext = 'Login'

    template = JINJA_ENVIRONMENT.get_template('index.html')
    template_values = {
        'url': url,
        'url_linktext': url_linktext,
    }
    self.response.write(template.render(template_values))

class Twitter(webapp2.RequestHandler):
  def determine_bg_color (self, sentiment):
    if sentiment == "positive":
      return "success"
    elif sentiment == "negative":
      return "danger"
    else:
      return "warning"

  def displayTweets(self, term):
    if term == "":
      return []

    # Search twitter
    search_results = twitter.search(q=term, count=10, lang='en')

    results = []

    for tweet in search_results['statuses']:
      text = tweet['text'].encode('utf-8')
      try:
        sentiment = datum_box.twitter_sentiment_analysis(text)
        bg_color = self.determine_bg_color(sentiment)
        user_name = tweet['user']['screen_name'].encode('utf-8')
        results.append(Result(user=unicode(user_name, "utf-8"), text=unicode(text, "utf-8"), bg_color=bg_color))
      except:
        continue
    return results

  def post(self):
    text = self.request.get('content')
    log_entry = Query(user=users.get_current_user(), text=text)
    log_entry.put()
    twitter_sentiment_results = self.displayTweets(text)
    if len(twitter_sentiment_results) == 0:
      self.redirect('/')

    template = JINJA_ENVIRONMENT.get_template('results.html')
    template_values = {
        'twitter_sentiment_results': twitter_sentiment_results,
    }
    self.response.write(template.render(template_values))


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/results', Twitter),
], debug=True)
