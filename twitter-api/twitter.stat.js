const wordCount = (posts) => {
  const counts = {}, words = []

  posts.forEach(post => post.forEach(word => {
    if(counts[word]) {
      counts[word] = counts[word] + 1
    }
    else {
      counts[word] = 1
      words.push(word)
    }
  }))

  return words.sort((a, b) => counts[b] - counts[a]).map(word => ({ word, count: counts[word] }))
}

module.exports = { wordCount }
