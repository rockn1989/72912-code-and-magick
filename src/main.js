'use strict';

define(['./form', './game', './gallery', './reviews'], function(form, Game, Gallery) {
  var game = new Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    form.open(function() {
      game.setGameStatus(Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  form.onClose = function() {
    game.setDeactivated(false);
  };
  var galleryImg = document.querySelectorAll('.photogallery .photogallery-image img');
  var galleryLink = document.querySelectorAll('.photogallery .photogallery-image');

  var picture = Array.prototype.map.call(galleryImg, function(img) {
    return img.getAttribute('src');
  });

  var gallery = new Gallery(picture);

  Array.prototype.forEach.call(galleryLink, function(link, i) {
    link.addEventListener('click', function() {
      gallery.setHash(i);
    });
  });
});

