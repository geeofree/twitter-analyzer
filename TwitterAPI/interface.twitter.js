import Twitter from 'twitter'

export default (APIConfig) => {
  const _twitter = new Twitter(APIConfig)

  const getUserTweets = (screen_name) => {
    return new Promise((resolve, reject) => {
      const params = { screen_name, count: 200, include_rts: false, exclude_replies: true }
      const endpoint = 'statuses/user_timeline.json'
      const posts = []

      const getTweets = (item=true, counter=0) => {
        if(item) { params.max_id = item.id }
        if(!item || counter >= 1000) { resolve(posts); return; }
        if(!item && counter === 0) { reject({ status: 403, data: 'No Data found' }); return; }

        _twitter.get(endpoint, params, (err, data) => {
          const last_item = data[data.length - 1]
          const data_sum = counter + data.length

          posts.push(...data.map(d => d.text))
          getTweets(last_item, data_sum)
        })
      }

      getTweets()
    })
  }

  return { getUserTweets }
}
