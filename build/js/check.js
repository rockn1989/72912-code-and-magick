
function getMessage(a, b) {

  var typeA = typeof a,
      aArray = Array.isArray(a),
      bArray = Array.isArray(b);

  if(typeA === 'boolean') {
    return a ? "Я попал в " + b : "Я никуда не попал";
  }

  if(typeA === 'number') {
    return "Я прыгнул на " + a * 100 + " сантиметров";
  }

  if(aArray && !b) {
    var numberOfSteps = a.reduce(function(prevValue, currentValue) {
      return prevValue + currentValue;
    }, 0);

    return "Я прошёл " + numberOfSteps + " шагов";
  }

  if(aArray && bArray) {
    var distancePath = a.reduce(function(prevValue, currentValue, i) {
      return prevValue + currentValue * b[i];
    }, 0);

    return "Я прошёл " + distancePath + " метров";
  }
}

