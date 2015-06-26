var stopAllAudio = function() {
  $('.audio').each(function() {
    this.pause();
  })
}

var updateElapsedTime = function() {
  var date = new Date();
  $('#elapsed-time').text(date.toLocaleString());
}

$(document).ready(function() {
  var container = document.getElementById('container');
  var pages = document.querySelectorAll('.page');
  var slip = Slip(container, 'y').webapp(pages).end(function() {
    if (this.page == 1) {
      stopAllAudio();
      $('#page-2-audio').trigger('play');
    } else if (this.page == 3) {
      stopAllAudio();
      $('#page-4-audio').trigger('play');
    }
  });

  setInterval(updateElapsedTime, 200);
})
