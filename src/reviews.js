'use strict';

var cbResult = function(data) {
  window.reviews = data;
};
function requestJSONP(url, callback) {
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
}

requestJSONP('http://localhost:1506/api/reviews', cbResult);

