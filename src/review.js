'use strict';

define(['./loadImage'], function(loadImage) {
  var templateElement = document.querySelector('#review-template');
  var elementToClone = (templateElement.content || templateElement).querySelector('.review');
  /**
   * Шаблонизирует отзыв
   * @param {ReviewData[]} data Объект отзыва с данными
   * @returns {Node} Блок отзыва
   */
  return function getReviewElement(data) {
    var review = elementToClone.cloneNode(true);
    var starsArray = ['one', 'two', 'three', 'four', 'five'];
    review.querySelector('.review-rating').classList.add('review-rating-' + starsArray[data.rating - 1]);
    review.querySelector('.review-text').textContent = data.description;
    loadImage(data.author.picture, function(status) {
      if(status) {
        var imgTemplate = review.querySelector('.review-author');
        imgTemplate.src = data.author.picture;
        imgTemplate.width = 124;
        imgTemplate.height = 124;
      } else {
        review.classList.add('review-load-failure');
      }
    });
    return review;
  };
});
