function SocialMediaGateway() {

  this.getAllUsers = function(searchTerm) {
    var self = this;
    return new Promise(function(resolve, reject) {
      if (searchTerm == '') resolve([]);
      var tasks = [];
      tasks.push(self.getUsers('/twitter', searchTerm));
      tasks.push(self.getUsers('/googleplus', searchTerm));
      Promise.all(tasks).then(function(userNames) {
        resolve(userNames[0].concat(userNames[1]));
      }, function(error) {
        reject(error);
      })
    })
  }

  this.getUsers = function(url, searchTerm) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        method: "GET",
        url: url,
        data: {term: searchTerm},
        dataType: "json",
      })
      .done(function(data) {
        if (data.users) {
          resolve(data.users);
        }
        if (data.error) {
          reject(url + ': ' + data.error);
        }
      })
      .fail(function(error) {
        // Error not caught on the server, likely 'Internal Server Error'.
        reject(url + ': ' + error.statusText);
      })
    })
  }

}
