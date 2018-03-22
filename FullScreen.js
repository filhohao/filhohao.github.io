function browserDoesFullscreenWell(userAgent) {
  var firefox = (userAgent.indexOf('Firefox') > -1);
  var android = (userAgent.indexOf('Android') > -1);
  var iphone = (userAgent.indexOf('iPhone') > -1);
  if (firefox || android || iphone) {
    return false;
  }
  else {
    return true;
  }
}

function fullscreenOn() {
  var fullscreenElement = document.fullscreenElement ||
                          document.mozFullScreenElement ||
                          document.webkitFullscreenElement ||
                          document.msFullscreenElement;
  return (fullscreenElement != null);
}

function turnOnFullscreen() {
  var i = document.body;
  if (i.requestFullscreen) {
    i.requestFullscreen();
  } else if (i.webkitRequestFullscreen) {
    i.webkitRequestFullscreen();
  } else if (i.mozRequestFullScreen) {
    i.mozRequestFullScreen();
  } else if (i.msRequestFullscreen) {
    i.msRequestFullscreen();
  }
}

function turnOffFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
