'use strict';

window.form = (function() {
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
    if(textArea.required) {
      isTextValid = textArea.value !== '';
    } else {
      isTextValid = true;
    }

    titleFieldName.classList.toggle('invisible', isNameValid);

    titleFieldText.classList.toggle('invisible', isTextValid);

    sendButton.disabled = !(isNameValid && isTextValid);

    titleFields.classList.toggle('invisible', (isNameValid && isTextValid));

  }

  rating.forEach(function(el) {
    el.addEventListener('change', validateForm);
  });

  requiredFieldName.addEventListener('input', validateForm);

  textArea.addEventListener('input', validateForm);

  currentForm.addEventListener('submit', validateForm);

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
})();
