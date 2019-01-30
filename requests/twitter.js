'use strict';
const request = require('request-promise');

module.exports = {
  get_tweets: async () => {
    let body = await request.get('https://api.twitter.com/1.1/search/tweets.json?q=%23brexit', {
      oauth: {
        consumer_key: process.env.TWITTER_COSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        token: process.env.TWITTER_ACCESS_TOKEN_KEY,
        token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      }
    })

    let bodyJson = JSON.parse(body);

    let tweets = bodyJson.statuses.map((tweet, index) => {
      return {
        id: index.toString(),
        text: tweet.text
      }
    })

    return tweets
  }
}
