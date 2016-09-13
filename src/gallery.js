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
    this.show = this.show.bind(this);

    this.checkHashStatus = this.checkHashStatus.bind(this);
    this.checkHashStatus();
    window.addEventListener('hashchange', this.checkHashStatus);
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
    location.hash = '';
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
      this.setHash(this.activePicture - 1);
    }
  };

  /**
   * Переключение картинок в галереи вперед
   */
  Gallery.prototype.next = function() {
    if(this.activePicture !== this.pictures.length - 1) {
      this.setHash(this.activePicture + 1);
    }
  };

  /**
   * Показать текущую картинку
   * @param {number | string} imgIndex Индекс текущей картинки в массиве с путями картинок
   */
  Gallery.prototype.setActivePicture = function(imgIndex) {
    var oldImg = this.previewBlock.querySelector('img');
    var newImg = new Image();
    if(typeof imgIndex !== 'number') {
      this.activePicture = this.pictures.indexOf(imgIndex);
    } else {
      this.activePicture = imgIndex;
    }
    newImg.src = this.pictures[this.activePicture];
    if (oldImg) {
      this.previewBlock.replaceChild(newImg, oldImg);
    } else {
      this.previewBlock.appendChild(newImg);
    }
    this.previewNumberCurrent.textContent = this.activePicture + 1;
  };
  /**
   * Записывает значение в хэш страницы
   * @param {number} [imgSrc] индекса массива
   */
  Gallery.prototype.setHash = function(imgSrc) {
    if(typeof imgSrc === 'number') {
      location.hash = 'photo/' + this.pictures[imgSrc];
    } else {
      location.hash = '';
    }
  };

  /**
   *  Получение хэша страницы
   */
  Gallery.prototype.checkHashStatus = function() {
    var parseUrl = location.hash.match(/#photo\/(\S+)/);
    if(parseUrl) {
      if(this.pictures.indexOf(parseUrl[1]) !== -1) {
        this.show(parseUrl[1]);
      }
    } else {
      this.hide();
    }
  };

  return Gallery;
});
