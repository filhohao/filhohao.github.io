function Audio() {
  this.sounds = {};

  this.loadSounds = function() {
    var soundNames = [
        'Hole_Punch-Simon_Craggs-1910998415',
        'SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408',
        'Tick-DeepFrozenApps-397275646',
    ];
    for (var i=0; i<soundNames.length; i++) {
      var soundName = soundNames[i];
      this.sounds[soundName] = new Howl({src: [soundName+'.mp3']});
    }
  }

  this.playSound = function(soundName) {
    this.sounds[soundName].play();
  }

  this.stop = function(soundName) {
    if (!this.sounds[soundName]) {
      throw 'Sound "' + soundName + '" not loaded!';
    }
    var sound = this.sounds[soundName];
    var soundIds = this._getInstanceIds(sound);
    this._stopInstances(sound, soundIds);
  }

  this._getInstanceIds = function(sound) {
    var retVal = [];
    for (var i=0; i<sound._sounds.length; i++) {
      var node = sound._sounds[i];
      retVal.push(node._id);
    }
    return retVal;
  }

  this._stopInstances = function(sound, soundIds) {
    for (var i=0; i<soundIds.length; i++) {
      var id = soundIds[i];
      sound.stop(id);
    }
  }

}
