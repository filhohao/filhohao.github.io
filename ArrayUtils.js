Array.prototype.getOneRandomElement = function() {
  return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.getRandomElements = function(numberOfElementsToGet) {
  var retval = [];
  var clone = this.slice(0);
  for (var i = 0; i < numberOfElementsToGet; i++) {
    if (clone.length == 0) {
      break;
    }
    else {
      var element = clone.getOneRandomElement();
      retval.push(element);
      // Remove the picked element so we don't pick it again.
      clone.splice(clone.indexOf(element), 1);
    }
  }
  return retval;
}

Array.prototype.removeBlanks = function() {
  return this.filter(function(entry) {
    return (entry != '')
  })
}
