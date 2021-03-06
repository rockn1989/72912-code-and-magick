'use strict';

define(['./load', './review'], function(load, Review) {
  var PAGE_SIZE = 3;
  var pagePosts = 1;

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsLoadMore = document.querySelector('.reviews-controls-more');
  var filter = localStorage.filterSave || 'reviews-all';

  /**
   * Массив для хранения созданных отзывов
   * @type {Review[]}
   */
  var reviewArray = [];

  if(filter) {
    reviewsFilter.querySelector('#' + filter).checked = true;
  }

  /**
   * Выводит постранично сообщения
   */
  function loadReviews() {
    var from = (pagePosts - 1) * PAGE_SIZE;
    var to = pagePosts * PAGE_SIZE;
    return load('/api/reviews', {from: from, to: to, filter: filter}, renderReviews);
  }

  reviewsFilter.addEventListener('change', function(evt) {
    reviewArray.forEach(function(review) {
      review.remove();
    });
    reviewArray = [];
    pagePosts = 1;
    filter = evt.target.id;
    localStorage.setItem('filterSave', evt.target.id);
    loadReviews();
  });

  reviewsLoadMore.addEventListener('click', function() {
    pagePosts++;
    loadReviews();
  });

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
      reviewArray.push(review);
      elFragment.appendChild(review.element);
    });
    reviewsList.appendChild(elFragment);
    reviewsFilter.classList.remove('invisible');

    var isAllReviewsLoaded = reviews.length < PAGE_SIZE;
    reviewsLoadMore.classList.toggle('invisible', isAllReviewsLoaded);
  }

  reviewsFilter.classList.add('invisible');
  loadReviews();
});


