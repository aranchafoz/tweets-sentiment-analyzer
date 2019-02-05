var express = require('express')
var app = express()

// For Heroku
app.set('port', (process.env.PORT || 3000));

let twitter = require('./requests/twitter')
let azure = require('./requests/azure')

const classify_score = (score) => {
  if(score < 1/3) return 'NEGATIVE'
  else if(score < 2/3) return 'NEUTRAL'
  else return 'POSITIVE'
}

const get_lastest_tweets_processed = (tweets, sentiments) => {
  return tweets.map((tweet) => {
    for(i in sentiments.documents) {
      let sentiment = sentiments.documents[i]
      if(tweet.id === sentiment.id){
        let type = classify_score(sentiment.score)

        return {
          text: tweet.text,
          type: type,
          score: sentiment.score,
          url: tweet.url
        }
      }
    }
  })
}

// Endpoint
app.get('/', async function(req, res) {
  let tweets = await twitter.get_tweets()
  let sentiments = await azure.get_sentiments(tweets)

  let response = get_lastest_tweets_processed(tweets, sentiments)

  res.setHeader('Content-Type', 'application/json')
  res.status(200)
  res.send(JSON.stringify(response, null, 3))
  res.end()
})

app.listen(app.get('port'), function () {
    console.log("Server running");
});

module.exports = app;
