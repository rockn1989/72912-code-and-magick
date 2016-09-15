'use strict';

define(function() {

  /**
   * Продление цепочки прототипов
   * @param {object} inheritObject дочерний объект
   * @param {object} parentObject  родительский объект
   */
  return function inherit(inheritObject, parentObject) {
    var DefaultObject = function() {};
    DefaultObject.prototype = parentObject.prototype;
    inheritObject.prototype = new DefaultObject();
  };
});
