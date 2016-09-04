'use strict';

module.exports = function(list, filterID) {
  switch(filterID) {
    case 'reviews-recent':
      var lastThreeDays = Date.now() - ( 1000 * 3600 * 24 * 3);
      list = list.filter(function(el) {
        return el.created >= lastThreeDays;
      }).sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case 'reviews-good':
      list = list.filter(function(el) {
        return el.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case 'reviews-bad':
      list = list.filter(function(el) {
        return el.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-popular':
      list = list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
    default: return list;
  }
  return list;
};
