
let twitter = require('./requests/twitter')
let azure = require('./requests/azure')


async function main() {
  let tweets = await twitter.get_tweets()
  let tweets_sentiments = await azure.get_sentiments(tweets)
  console.log(tweets_sentiments)
}

main()
