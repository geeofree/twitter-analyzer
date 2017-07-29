"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var wordCount = exports.wordCount = function wordCount(posts) {
  var counts = {},
      words = [];

  posts.forEach(function (post) {
    return post.forEach(function (word) {
      if (counts[word]) {
        counts[word] = counts[word] + 1;
      } else {
        counts[word] = 1;
        words.push(word);
      }
    });
  });

  return words.sort(function (a, b) {
    return counts[b] - counts[a];
  }).map(function (word) {
    return { word: word, count: counts[word] };
  });
};