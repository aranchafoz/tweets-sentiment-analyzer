
let twitter = require('./requests/twitter')
let azure = require('./requests/azure')

const classify_score = (score) => {
  if(score < 1/3) return 'NEGATIVE'
  else if(score < 2/3) return 'NEUTRAL'
  else return 'POSITIVE'
}

const display_results = (tweets, sentiments) => {

  console.log("*************************************")
  console.log("** LASTEST 15 TWEETS about #Brexit **")
  console.log("*************************************\n\n")

  tweets.map((tweet) => {
    for(i in sentiments.documents) {
      let sentiment = sentiments.documents[i]
      if(tweet.id === sentiment.id){
        let type = classify_score(sentiment.score)

        console.log(tweet.text)
        console.log(`--> ${type}`)
        console.log(`Score: ${sentiment.score} (being 0 the worst and 1 the best))\n\n\n`)
      }
    }
  })
}

async function main() {
  let tweets = await twitter.get_tweets()
  let sentiments = await azure.get_sentiments(tweets)

  display_results(tweets, sentiments)
}

main()
