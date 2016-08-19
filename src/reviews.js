'use strict';

var templateElement = document.querySelector('#review-template');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var elementToClone = (templateElement.content || templateElement).querySelector('.review');

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
    elFragment.appendChild(getReviewElement(reviewData));
  });

  reviewsList.appendChild(elFragment);
  reviewsFilter.classList.remove('invisible');
}

/**
 * Запрашивает JSONP
 * @param {string} url Адрес запроса
 * @param {function} callback Функция обратного вызова для получния JSONP
 */
function requestJSONP(url, callback) {
  var script = document.createElement('script');
  var options = url.indexOf('?') !== -1 ? '&' : '?';
  var cbName = 'cbJSONP' + String(Math.random()).slice(-6);
  script.src = url + options + 'callback=' + cbName;

  document.body.appendChild(script);

  window[cbName] = function(data) {
    callback(data);
    document.body.removeChild(script);
    delete window[cbName];
  };
}


/**
 * Загрузчик картинок
 * @param {string} imageUrl Путь картинки
 * @param {function} callback
 * @callback Функция вызывающаяся по результату загрузки картинки
 * @param {boolean} Значение передаваемое в callback-функцию
 */
function loadImage(imageUrl, callback) {
  var imgTemplate = new Image();

  imgTemplate.addEventListener('load', function() {
    callback(true);
  });

  imgTemplate.addEventListener('error', function() {
    callback(false);
  });

  imgTemplate.src = imageUrl;
}

/**
 * Шаблонизирует отзыв
 * @param {ReviewData[]} data Объект отзыва с данными
 * @returns {Node} Блок отзыва
 */
function getReviewElement(data) {
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
}

reviewsFilter.classList.add('invisible');
requestJSONP('http://localhost:1506/api/reviews', renderReviews);

