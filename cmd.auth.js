const prompt = require("prompt")

const schema = {
  properties: {
    consumer_key: {
      message: 'Enter Twitter API Consumer Key',
      required: true
    },
    consumer_secret: {
      message: 'Enter Twitter API Consumer Secret',
      required: true
    },
    access_token_key: {
      message: 'Enter Twitter API Access Token Key',
      required: true
    },
    access_token_secret: {
      message: 'Enter Twitter API Access Token Secret',
      required: true
    }
  }
}

const authAPI = (callback) => {
  prompt.start()
  prompt.get(schema, (err, result) => callback(result, err))
}

export default authAPI
