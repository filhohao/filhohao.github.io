function ImageCache() {
  this.images = new Object();

  this.loadImages = function() {
    var images = [
      'google_logo.png',
      'click_to_spin.png'
    ];
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      var promises = [];
      for (var i=0; i<images.length; i++) {
        promises.push(self.addImage(images[i]));
      }
      Promise.all(promises).then(function(urls) {
        resolve();
      });
    });
    return promise;
  }

  this.addImage = function(imageName) {
    var self = this;
    return new Promise(function(resolve, reject){
      self.images[imageName] = new Image();
      self.images[imageName].onload = function() {
        resolve(imageName);
      }
      self.images[imageName].onerror = function(){
        reject(imageName);
      }
      self.images[imageName].src = imageName;
    })
  };

  this.getImage = function(imageName) {
    if (imageName in this.images) {
      if (!this.images[imageName].complete) {
        return null;
      }
      return this.images[imageName];
    }
    else {
      throw 'Image ' + imageName + ' not found in ImageCache!';
    }
  };

}
