'use strict';

define(function() {

  /**
   * Объект-конструтор галереи
   * @constructor
   * @param {Array.<string>} data Массив с путями картинок для галереи
   */
  function Gallery(data) {
    this.pictures = data;
    this.activePicture = 0;
    this.overlayGallery = document.querySelector('.overlay-gallery');
    this.controlLeft = this.overlayGallery.querySelector('.overlay-gallery-control-left');
    this.controlRight = this.overlayGallery.querySelector('.overlay-gallery-control-right');
    this.galleryClose = this.overlayGallery.querySelector('.overlay-gallery-close');
    this.previewBlock = this.overlayGallery.querySelector('.overlay-gallery-preview');
    this.previewNumberCurrent = this.overlayGallery.querySelector('.preview-number-current');
    this.previewNumberTotal = this.overlayGallery.querySelector('.preview-number-total');
    this.previewNumberTotal.textContent = this.pictures.length;
  }

  /**
   *  Показывает галерею
   * @param {number} idx Принимает число. Индекс массива с путями картинок
   */
  Gallery.prototype.show = function(idx) {
    var self = this;

    this.galleryClose.onclick = function() {
      self.hide();
    };
    this.controlLeft.onclick = function() {
      self.prev();
    };
    this.controlRight.onclick = function() {
      self.next();
    };
    this.setActivePicture(idx);
    this.overlayGallery.classList.remove('invisible');
  };

  /**
   * Скрыть галерею
   */
  Gallery.prototype.hide = function() {
    this.galleryClose.onclick = null;
    this.controlLeft.onclick = null;
    this.controlRight.onclick = null;
    this.overlayGallery.classList.add('invisible');
  };

  /**
   * Переключение картинок в галереи назад
   */
  Gallery.prototype.prev = function() {
    if(this.activePicture !== 0) {
      this.setActivePicture(this.activePicture - 1);
    }

  };

  /**
   * Переключение картинок в галереи вперед
   */
  Gallery.prototype.next = function() {
    if(this.activePicture !== this.pictures.length - 1) {
      this.setActivePicture(this.activePicture + 1);
    }
  };

  /**
   * Показать текущую картинку
   * @param {number} imgIndex Индекс текущей картинки в массиве с путями картинок
   */
  Gallery.prototype.setActivePicture = function(imgIndex) {
    var oldImg = this.previewBlock.querySelector('img');
    this.activePicture = imgIndex;
    var newImgSrc = this.pictures[this.activePicture];
    var newImg = new Image();

    newImg.src = newImgSrc;
    if(oldImg) {
      this.previewBlock.replaceChild(newImg, oldImg);
    } else {
      this.previewBlock.appendChild(newImg);
    }

    this.previewNumberCurrent.textContent = this.activePicture + 1;

  };

  return Gallery;
});