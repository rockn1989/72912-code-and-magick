'use strict';

define(['./load', './review'], function(load, Review) {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');

  /**
   * @typedef {Object} ReviewData
   * Объект с отзывами к игре
   * @property {Object} author
   * @property {string} author.name
   * @property {string} author.picture
   * @property {number} review_usefulness
   * @property {number} rating
   * @property {string} description
   */

  /**
   * Отрисовывает отзывы
   * @param {ReviewData[]} reviews
   */
  function renderReviews(reviews) {
    var elFragment = document.createDocumentFragment();

    reviews.forEach(function(reviewData) {
      var review = new Review(reviewData);
      elFragment.appendChild(review.element);
    });

    reviewsList.appendChild(elFragment);
    reviewsFilter.classList.remove('invisible');
  }

  reviewsFilter.classList.add('invisible');
  load('http://localhost:1506/api/reviews', renderReviews);
});


