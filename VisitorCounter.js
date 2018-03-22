function VisitorCounter() {

  this.setCookie = function() {
    if (document.cookie.indexOf('uid=') == -1) {
      var newCookie = this.randomIntFromInterval(1000000, 9999999);
      document.cookie = "uid=" + newCookie;
    }
  }

  this.getVisitorsToday = function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        method: "GET",
        url: '/visitorCount',
        data: {},
        dataType: "json",
      })
      .done(function(data) {
        if (data.message) {
          resolve(data.message);
        }
        if (data.error) {
          reject('getVisitorsToday() ' + data.error);
        }
      })
      .fail(function(error) {
        // Error not caught on the server, likely 'Internal Server Error'.
        reject('getVisitorsToday() ' + error.statusText);
      })
    })
  }

  this.randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  
}
