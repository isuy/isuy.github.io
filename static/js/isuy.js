var stopAllAudio = function(excludedID) {
  $('.audio').each(function() {
    var currentID = this.getAttribute('id');
    if (currentID != excludedID && !this.paused)
      this.pause();
  })
}

var playAudio = function(id) {
  var audio = $('#' + id);
  var cover = audio.parent('.audio-container').find('.cover');

  if (audio.prop('paused'))
    audio.trigger('play');
  if (!cover.hasClass('animate'))
    cover.addClass('animate');
}

var pauseAudio = function(id) {
  var audio = $('#' + id);
  var cover = audio.parent('.audio-container').find('.cover');

  if (!audio.prop('paused'))
    audio.trigger('pause');
  if (cover.hasClass('animate'))
    cover.removeClass('animate');
}

var playOrPauseAudio = function(cover) {
  var audio = cover.parent('.audio-container').find('audio');
  var id = audio.attr('id');

  if (audio.prop('paused'))
    playAudio(id);
  else
    pauseAudio(id);
}

var updateElapsedTime = function() {
  var date = new Date();
  $('#elapsed-time').text(date.toLocaleString());
}

$(document).ready(function() {
  var container = document.getElementById('container');
  var pages = document.querySelectorAll('.page');
  var slip = Slip(container, 'y').webapp(pages).end(function() {
    if (this.orient.toString() == '')
      return;

    if (this.page == 1) {
      id = 'page-2-audio';
      stopAllAudio(id);
      playAudio(id);
    } else if (this.page == 3) {
      id = 'page-4-audio';
      stopAllAudio(id);
      playAudio(id);
    }
  });

  setInterval(updateElapsedTime, 200);

  $('.cover').click(function() {
    playOrPauseAudio($(this));
  });

  $('.audio').each(function() {
    this.addEventListener('ended', function() {
      this.load();
      var cover = $(this).parent('.audio-container').find('.cover');
      if (cover.hasClass('animate'))
        cover.removeClass('animate');
    });
  })
})
