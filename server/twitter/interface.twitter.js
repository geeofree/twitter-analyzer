import Twitter from 'twitter'

export default (APIConfig) => {
  const _twitter = new Twitter(APIConfig)

  const getUserTweets = (twitterHandle, callback) => {
    const endpoint = 'statuses/user_timeline.json'
    const params = { screen_name: twitterHandle, count: 200, include_rts: false }
    const posts = []

    const getData = (err, tweets) => {
      const last_item = tweets[tweets.length - 1]

      if(err) {
        callback({ status: 503, data: 'Something went wrong with the request' })
        return
      }

      // Stream is finish when last item is undefined
      if(last_item === undefined) {
        callback({ status: 200 })
        return
      }

      // Stop recursion when the last ID is still the same id from the old iteration
      if(params.max_id && params.max_id === last_item.id) return
      params.max_id = last_item.id

      const max_data = 1000
      const status_count = last_item.user.statuses_count
      const limit = status_count < max_data ? status_count : max_data

      // Throw an error when an account exists but has never tweeted
      if(posts.length === 0 && tweets.length === 0) {
        callback({ status: 404, data: 'No data found' })
        return
      }

      if(posts.length + tweets.length < limit) {
        posts.push(...tweets)
        callback({ status: 201, data: tweets, max_batch: limit })
      }
      else {
        // Store tweets that is around the index of limit - 1
        const final_tweets_batch = tweets.filter((_, index) => index < limit - posts.length)
        posts.push(...final_tweets_batch)
        // Send final batch of tweets
        callback({ status: 201, data: final_tweets_batch, max_batch: limit })
      }

      if(posts.length < limit) {
        _twitter.get(endpoint, params, getData)
        return
      }

      // Stream is finished
      callback({ status: 200 })
    }

    _twitter.get(endpoint, params, getData)
  }

  return { getUserTweets }
}


// if(err) { callback({}); return; }
//
// if(posts.length === 0 && tweets.length === 0) {
//   reject({ status: 404, status_message: 'Data not found.' })
//   return
// }
// else if(tweets.length === 0) { resolve(posts); return; }
//
// const max_data = 1000
// const lastItem = tweets[tweets.length - 1]
// const limit = lastItem.user.status_count < max_data ? lastItem.user.status_count : max_data
//
// if(params.max_id && params.max_id === lastItem.id) { resolve(posts); return; }
// params.max_id = lastItem.id
//
// if(posts.length + tweets.length < limit) {
//   posts.push(...tweets)
// }
// else {
//   posts.push(...tweets.filter((_, index) => index < limit - posts.length))
// }
//
//
// if(posts.length < limit) {
//   _twitter.get(endpoint, params, getData)
//   return
// }
//
// resolve(posts)
