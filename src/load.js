'use strict';

define(function() {
  /**
   * Запрашивает JSONP
   * @param {string} url Адрес запроса
   * @param {function} callback Функция обратного вызова для получния JSONP
   */
  return function requestJSONP(url, callback) {
    var script = document.createElement('script');
    var options = url.indexOf('?') !== -1 ? '&' : '?';
    var cbName = 'cbJSONP' + String(Math.random()).slice(-6);
    script.src = url + options + 'callback=' + cbName;

    document.body.appendChild(script);

    window[cbName] = function(data) {
      callback(data);
      document.body.removeChild(script);
      delete window[cbName];
    };
  };
});

