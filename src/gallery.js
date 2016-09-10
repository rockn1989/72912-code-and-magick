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
    this.hide = this.hide.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  /**
   *  Показывает галерею
   * @param {number} idx Принимает число. Индекс массива с путями картинок
   */
  Gallery.prototype.show = function(idx) {
    this.galleryClose.addEventListener('click', this.hide);
    this.controlLeft.addEventListener('click', this.prev);
    this.controlRight.addEventListener('click', this.next);
    this.setActivePicture(idx);
    this.overlayGallery.classList.remove('invisible');
  };

  /**
   * Скрыть галерею
   */
  Gallery.prototype.hide = function() {
    this.galleryClose.removeEventListener('click', this.hide);
    this.controlLeft.removeEventListener('click', this.prev);
    this.controlRight.removeEventListener('click', this.next);
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
