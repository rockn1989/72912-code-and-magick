'use strict';

define(function() {
  return function throttle(fn, time) {
    var lastTime = 0;
    return function() {
      if(Date.now() - lastTime >= time) {
        lastTime = Date.now();
        fn();
      }
    };
  };
});
