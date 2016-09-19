'use strict';

define(['./loadImage', './support', './base-component', './review-data'], function(loadImage, inherit, BaseComponent, ReviewData) {
  var templateElement = document.querySelector('#review-template');
  var elementToClone = (templateElement.content || templateElement).querySelector('.review');
  inherit(Review, BaseComponent);

/**
 * Шаблонизирует отзыв
 * @param {ReviewData[]} data Объект отзыва с данными
 * @constructor
 */
  function Review(data) {
    this.data = new ReviewData(data);
    BaseComponent.call(this, elementToClone.cloneNode(true));
    this.answerYes = this.element.querySelector('.review-quiz-answer-yes');
    this.answerNo = this.element.querySelector('.review-quiz-answer-no');
    this.element.querySelector('.review-text').textContent = this.data.getDescription();

    this.setRating();
    this.setQuizAnswer = this.setQuizAnswer.bind(this);
    this.onUsefulnessChange = this.onUsefulnessChange.bind(this);
    this.answerYes.addEventListener('click', this.setQuizAnswer);
    this.answerNo.addEventListener('click', this.setQuizAnswer);
    this.imageLoad();
  }

  /**
   * Устанавливает значение рейтинга
   */
  Review.prototype.setRating = function() {
    var ratingsArray = ['one', 'two', 'three', 'four', 'five'];
    this.element.querySelector('.review-rating').classList.add('review-rating-' + ratingsArray[this.data.getRating() - 1]);
  };

  /**
   * Записывает ответ
   * @param {HTMLInputElement} evt
   */
  Review.prototype.setQuizAnswer = function(evt) {
    var isYes = evt.target.classList.contains('review-quiz-answer-yes');
    this.data.updateStatus(isYes, this.onUsefulnessChange);
  };

  /**
   * Выделяет ответ
   * @param {boolean} response
   */
  Review.prototype.onUsefulnessChange = function(response) {
    this.answerYes.classList.toggle('review-quiz-answer-active', response);
    this.answerNo.classList.toggle('review-quiz-answer-active', !response);
  };

  /**
   * Удаляет обработчики событий по клику
   */
  Review.prototype.remove = function() {
    this.answerYes.removeEventListener('click', this.setQuizAnswer);
    this.answerNo.removeEventListener('click', this.setQuizAnswer);
    BaseComponent.prototype.remove.call(this);
  };

  /**
   * Загружает изображение
   */
  Review.prototype.imageLoad = function() {
    loadImage(this.data.getAuthorPicture(), function(status) {
      if(status) {
        var imgTemplate = this.element.querySelector('.review-author');
        imgTemplate.src = this.data.getAuthorPicture();
        imgTemplate.width = 124;
        imgTemplate.height = 124;
      } else {
        this.element.classList.add('review-load-failure');
      }
    }.bind(this));
  };
  return Review;
});
