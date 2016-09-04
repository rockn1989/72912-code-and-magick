'use strict';

define(function() {
  return function load(url, settings, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var response = JSON.parse(xhr.response);
      callback(response);
    };

    var stringifyParams = Object.keys(settings)
      .map(function(keys) {
        return keys + '=' + settings[keys];
      })
      .join('&');

    xhr.open('GET', url + '?' + stringifyParams);
    xhr.send();
  };

});

