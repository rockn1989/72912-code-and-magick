'use strict';

define(['./loadImage'], function(loadImage) {
  var templateElement = document.querySelector('#review-template');
  var elementToClone = (templateElement.content || templateElement).querySelector('.review');

/**
 * Шаблонизирует отзыв
 * @param {ReviewData[]} data Объект отзыва с данными
 * @returns {object} объект блока отзыва
 */
  function Review(data) {
    var self = this;
    this.data = data;
    this.element = elementToClone.cloneNode(true);
    this.answerYes = this.element.querySelector('.review-quiz-answer-yes');
    this.answerNo = this.element.querySelector('.review-quiz-answer-no');
    this.element.querySelector('.review-text').textContent = this.data.description;
    this.setRating();

    this.answerYes.onclick = this.answerNo.onclick = function(e) {
      self.setQuizAnswer(e.target);
    };
    this.imageLoad();
  }

  /**
   * Выделяет правильный ответ
   * @param {HTMLInputElement} target
   */
  Review.prototype.setQuizAnswer = function(target) {
    var isYes = target === this.answerYes;
    this.answerYes.classList.toggle('review-quiz-answer-active', isYes);
    this.answerNo.classList.toggle('review-quiz-answer-active', !isYes);
  };

  /**
   * Удаляет обработчики событий по клику
   */
  Review.prototype.remove = function() {
    this.answerYes.onclick = null;
    this.answerNo.onclick = null;
  };

  /**
   * Устанавливает рейтинг
   */
  Review.prototype.setRating = function() {
    var ratingsArray = ['one', 'two', 'three', 'four', 'five'];
    this.element.querySelector('.review-rating').classList.add('review-rating-' + ratingsArray[this.data.rating - 1]);
  };

  /**
   * Загружает изображение
   */
  Review.prototype.imageLoad = function() {
    var self = this;
    loadImage(self.data.author.picture, function(status) {
      if(status) {
        var imgTemplate = self.element.querySelector('.review-author');
        imgTemplate.src = self.data.author.picture;
        imgTemplate.width = 124;
        imgTemplate.height = 124;
      } else {
        self.element.classList.add('review-load-failure');
      }
    });
  };

  return Review;
});
