'use strict';

define(function() {
  /**
   * @callback loadImageCallback
   * @param {boolean} Результат загрузки картинки: true/false
   */

  /**
   * Загрузчик картинок
   * @param {string} imageUrl Путь картинки
   * @param {loadImageCallback} callback
   */
  return function loadImage(imageUrl, loadImageCallback) {
    var imgTemplate = new Image();

    imgTemplate.addEventListener('load', function() {
      loadImageCallback(true);
    });

    imgTemplate.addEventListener('error', function() {
      loadImageCallback(false);
    });

    imgTemplate.src = imageUrl;
  };
});
