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
  return ReviewData;
});
