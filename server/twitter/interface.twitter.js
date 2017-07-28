import Twitter from 'twitter'

export default (APIConfig) => {
  const _twitter = new Twitter(APIConfig)

  const getUserTweets = (twitterHandle) => {
    return new Promise((resolve, reject) => {
      const endpoint = 'statuses/user_timeline.json'
      const params = { screen_name: twitterHandle, count: 200, include_rts: false }
      const posts = []

      const getData = (err, tweets) => {
        if(err) { reject({ status: 404, status_message: 'Data not found.' }); return; }

        if(posts.length === 0 && tweets.length === 0) {
          reject({ status: 404, status_message: 'Data not found.' })
          return
        }
        else if(tweets.length === 0) { resolve(posts); return; }

        const max_data = 1000
        const lastItem = tweets[tweets.length - 1]
        const limit = lastItem.user.status_count < max_data ? lastItem.user.status_count : max_data

        if(params.max_id && params.max_id === lastItem.id) { resolve(posts); return; }
        params.max_id = lastItem.id

        if(posts.length + tweets.length < limit) {
          posts.push(...tweets)
        }
        else {
          posts.push(...tweets.filter((_, index) => index < limit - posts.length))
        }


        if(posts.length < limit) {
          _twitter.get(endpoint, params, getData)
          return
        }

        resolve(posts)
      }

      _twitter.get(endpoint, params, getData)
    })
  }

  return { getUserTweets }
}
