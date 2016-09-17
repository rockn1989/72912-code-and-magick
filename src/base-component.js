'use strict';

define(function() {

  /**
   * Объект прототип
   * @param el {HTMLElement} DOM-элемент
   * @constructor
   */
  function BaseComponent(el) {
    this.element = el;
  }

  BaseComponent.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);
  };
  return BaseComponent;
});
