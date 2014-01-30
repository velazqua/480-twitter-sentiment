Twitter Sentiment Analysis
==========================

App is online at http://480-twitter-sentiment.appspot.com/

Code can be found at: https://github.com/velazqua/480-twitter-sentiment

I use the Twitter API to search for a particular query on Twitter. The Twitter API gives me relevant tweets to my query and then I call a sentiment analysis API which determines whether a tweet is positive, negative or neutral. 

APIs used:
----------
- `Twitter API: <https://dev.twitter.com/>` Twitter Search APIs
- `DatumBox API: <http://www.datumbox.com/>` Machine Learning APIs

App is hosted through Google App Engine; it takes care of hosting, db needs, load balancing, and a lot more. I used python for the code.

Also, I keep a log of all queries on a google DataStore, which you cannot access. A screenshot is included in the github page.

External library used include (files not in github):
- `Datumbox-Python-Wrapper: <https://github.com/JoelHoskin/Datumbox-Python-Wrapper>` Used to interact with the Datumbox API
- `oauthlib: <https://github.com/idan/oauthlib>` Used for OAuth 2.0 token authorization stuff.
- `requests: <https://github.com/kennethreitz/requests>` Used for http requests.
- `requests_oauthlib: <https://github.com/requests/requests-oauthlib>` Library support for requests
- `twython: <https://github.com/ryanmcgrath/twython>` Used to make the twitter search requests.
