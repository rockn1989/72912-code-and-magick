'use strict';

define(['browser-cookies'], function(browsercookies) {

  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var currentForm = document.querySelector('.review-form');
  var sendButton = document.querySelector('.review-form-control');
  var titleFields = currentForm.querySelector('.review-fields');
  var titleFieldName = titleFields.querySelector('.review-fields-name');
  var titleFieldText = titleFields.querySelector('.review-fields-text');

  var requiredFieldName = currentForm.elements['review-name'];
  var rating = currentForm.elements['review-mark'];
  var textArea = currentForm.elements['review-text'];

  function validateForm() {
    requiredFieldName.required = true;
    var isNameValid = requiredFieldName.value !== '';

    textArea.required = rating.value < 3;
    var isTextValid;
    if (textArea.required) {
      isTextValid = textArea.value !== '';
    } else {
      isTextValid = true;
    }

    titleFieldName.classList.toggle('invisible', isNameValid);

    titleFieldText.classList.toggle('invisible', isTextValid);

    sendButton.disabled = !(isNameValid && isTextValid);

    titleFields.classList.toggle('invisible', (isNameValid && isTextValid));

  }

  function setCookie() {
    var today = new Date();
    var birthday = new Date();
    birthday.setMonth(11);
    birthday.setDate(9);
    var differenceDate = today - birthday;
    differenceDate = differenceDate <= 0 ? today - (birthday.setFullYear(birthday.getFullYear() - 1)) : differenceDate;
    var cookieDay = Math.floor(differenceDate / 1000 / 3600 / 24);

    browsercookies.set('review-mark', rating.value, {expires: cookieDay});
    browsercookies.set('review-name', requiredFieldName.value, {expires: cookieDay});
  }

  function initCookie() {
    var ratingCookie = browsercookies.get('review-mark');
    var requiredFieldNameCookie = browsercookies.get('review-name');
    if (ratingCookie) {
      rating.value = ratingCookie;
    }
    if (requiredFieldNameCookie) {
      requiredFieldName.value = requiredFieldNameCookie;
    }
  }

  rating.forEach(function(el) {
    el.addEventListener('change', validateForm);
  });

  requiredFieldName.addEventListener('input', validateForm);

  textArea.addEventListener('input', validateForm);

  currentForm.addEventListener('submit', setCookie);
  initCookie();
  validateForm();

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
});
