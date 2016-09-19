'use strict';

define(function() {
  function ReviewData(data) {
    this.data = data;
  }

  /**
   * @returns {string} Возвращает содержимое поля описания
   */
  ReviewData.prototype.getDescription = function() {
    return this.data.description;
  };

  /**
   * returns {string} Возвращает рейтинг
   */
  ReviewData.prototype.getRating = function() {
    return this.data.rating;
  };

  /**
   * returns {string} Возвращает путь картинки
   */
  ReviewData.prototype.getAuthorPicture = function() {
    return this.data.author.picture;
  };

  /**
   * Проверяет входящие данные
   * @param {boolean} value
   * @param {function} callback Ответ на изменение объекта
   */
  ReviewData.prototype.updateStatus = function(value, callback) {
    this.valueStatus = value ? 1 : -1;
    this.data.review_usefulness += this.valueStatus;
    callback(value);
  };

  return ReviewData;
});
