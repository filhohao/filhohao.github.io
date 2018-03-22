function Wheel(canvas, imageCache) {
  this.canvas = canvas;
  this.imageCache = imageCache;
  this.names = [];
  this.angle = 0;
  this.speed = 0;
  this.nameLastTick = '';
  this.editable = true;
  this.hasSpun = false;

  this.setNames = function(names) {
    if (this.editable) {
      this.names = names;
      this.wheelImage = null;
    }
  }

  this.getNumberOfNames = function() {
    return this.names.length;
  }

  this.startSpin = function() {
    this.speed = .5 + Math.random() / 10.0;
    this.hasSpun = true;
  }

  this.tick = function() {
    this.nameFromLastTick = this.nameFromThisTick;
    this.nameFromThisTick = this.getNameAtPointer();
    // Move the wheel.
    this.angle += this.speed;
    if (this.angle > Math.PI * 2) {
      this.angle -= Math.PI * 2;
    }
    // Reduce the wheel's speed by 1%.
    this.speed = this.speed * .99;
    // Stop the wheel if it's very slow.
    if (this.speed < 0.002) {
      this.speed = 0;
    }
  }

  this.changedToNewName = function() {
    return (this.nameFromLastTick != this.nameFromThisTick);
  }

  this.getNameAtPointer = function() {
    var radiansPerSegment = 2 * Math.PI / this.names.length;
    var index = this.angle / radiansPerSegment;
    index = Math.round(index);
    if (index >= this.names.length) {
      index = 0;
    }
    var result = this.names[index];
    return result;
  }

  this.removeName = function(name) {
    this.names.splice(this.names.indexOf(name), 1);
    this.wheelImage = null;
  }

  this.isSpinning = function() {
    return (this.speed > 0);
  }

  this.hasAnyOtherNames = function(namesToCheck) {
    for (var i=0; i<this.names.length; i++) {
      if (namesToCheck.indexOf(this.names[i]) == -1) {
        return true;
      }
    }
    return false;
  }

  this.draw = function() {
    if (!this.wheelImage) {
      this.wheelImage = createInMemoryImage(this.canvas.width, this.canvas.height);
      this.drawWheelOnContext(this.wheelImage.getContext("2d"));
    }
    var context = this.canvas.getContext('2d');
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.rotate(this.angle);
    context.translate(-context.canvas.width / 2, -context.canvas.height / 2);
    context.drawImage(this.wheelImage, 0, 0);
    if (!this.hasSpun) {
      var image = this.imageCache.getImage('click_to_spin.png');
      context.drawImage(image, 0, 0);
    }
    context.restore();
    this.drawPointer(context);
    this.drawGoogleLogo(context);
  }

  this.drawWheelOnContext = function(context) {
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    var radiansPerSegment = 2 * Math.PI / this.names.length;
    var colors = ['#3369E8', '#D50F25', '#EEB211', '#009925'];
    var wheelRadius = context.canvas.width * .45;
    for (var i = 0; i < this.names.length; i++) {
      context.beginPath();
      context.moveTo(0, 0);
      context.arc(0, 0, wheelRadius, -radiansPerSegment/2, radiansPerSegment/2);
      context.lineTo(0, 0);
      context.fillStyle = colors[i % colors.length];
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = '#333333';
      context.stroke();
      context.fillStyle = 'black';
      context.font = '16pt Roboto';
      context.textBaseline = 'middle';
      context.textAlign = 'end';
      context.fillText(getNameForPrintingOnWheel(this.names[i]), wheelRadius - 10, 0);
      context.rotate(-radiansPerSegment);
    }
    context.restore();
    // Draw center circle, to reduce weird line effects.
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(0, 0, wheelRadius/5, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#333333';
    context.stroke();
    context.restore();
  }

  this.drawPointer = function(context) {
    var wheelRadius = context.canvas.width * .45;
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.beginPath();
    context.moveTo(wheelRadius - 10, 0);
    context.lineTo(wheelRadius + 30, -20);
    context.lineTo(wheelRadius + 30, 20);
    context.lineTo(wheelRadius - 10, 0);
    context.fillStyle = 'lightgray';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#333333';
    context.stroke();
    context.restore();
  }

  this.drawGoogleLogo = function(context) {
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.rotate(this.angle);
    var image = this.imageCache.getImage('google_logo.png');
    context.drawImage(image, -image.width/2, -image.height/2);
    context.restore();
  }

  function createInMemoryImage(width, height) {
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    return tempCanvas;
  }

  function getNameForPrintingOnWheel(fullName) {
    if (fullName.length <= 22) {
      return fullName;
    }
    else {
      return fullName.substring(0, 21) + '…';
    }
  }


}
