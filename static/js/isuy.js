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
  var beginDate = new Date(2014, 9, 30, 23, 39);
  var currentDate = new Date();
  var delta = currentDate.getTime() - beginDate.getTime();

  var days = Math.floor(delta / 86400000);
  delta -= days * 86400000;

  var hours = Math.floor(delta / 3600000);
  delta -= hours * 3600000;

  var minutes = Math.floor(delta / 60000);
  delta -= minutes * 60000;

  var seconds = Math.floor(delta / 1000);

  var elapsedTime = days + '天' + hours + '时' + minutes + '分' + seconds + '秒';
  $('#elapsed-time').text(elapsedTime);
}

var triggerCanvas = function() {
  var canvasContainer = $('#canvas-container');
  var c = document.getElementsByTagName('canvas')[0];
  var b = document.body;
  var a = c.getContext('2d');

  var M=Math,n=M.pow,i,E=2,F="rgba(233,61,109,";
  var d=M.cos,z=M.sin,L=1;
  var W=window;
  var u=Math.floor(W.innerWidth * 0.04),w=c.width=W.innerWidth,h=c.width * 0.6;
  c.height=c.width * 0.48;
  var offset = c.height * 0.04;
  var r=function(){
    return M.random()*2-1
  };
  var y="px Arial",v="♥",X=w/2,Y=h/2,T=4;
  var p=function(){
    var e=this;
    e.g=function(){
      e.x=X;e.y=Y;e.k=0;e.l=0;e.t=M.random()*19000;e.c=e.t
    };
    e.d=function(){
      a.fillStyle=F+(e.c/e.t)+")";
      a.fillText(v,e.x,e.y + offset);
      e.c-=50;
      e.x+=e.k;
      e.y+=e.l;
      e.k=e.k+r();
      e.l=e.l+r();
      if(e.c<0||e.x>w||e.x<0||e.y>h||e.y<0){e.g()}
    };
    e.g()
  },A,B;
  a.textAlign="center";
  a.strokeStyle="#000";
  a.lineWidth=2;
  for(i=0;i<350;i++) {
    M[i]=new p()
  }
  setInterval(function(){
    a.clearRect(0,0,w,h);
    a.font=u+y;
    X=(w/6*n(z(T),3)+w/2);
    Y=0.8*(-h/40*(13*d(T)-5*d(2*T)-2*d(3*T)-d(4*T))+h/2.3);
    T+=(z(T)+3)/99;
    for(i=0;i<350;i++){
      with(M[i]){
        A=(x/w-0.5)*2,B=-(y/h-0.5);
        if(L&&(A*A+2*n((B-0.5*n(M.abs(A),0.5)),2))>0.11){k=l=0}
        d()
      }
    }
    a.font=(2.3 * u) +y;
    a.fillStyle="#E93D6D";
    a.fillText(v,X,Y+u);
    a.strokeText(v,X,Y+u);
  },50);
}

$(document).ready(function() {
  var container = document.getElementById('container');
  var pages = document.querySelectorAll('.page');
  var slip = Slip(container, 'y').webapp(pages).end(function() {
    if (this.orient.toString() == '')
      return;

    if (this.page == 1) {
      id = 'page-1-audio';
      stopAllAudio(id);
      playAudio(id);
    } else if (this.page == 3) {
      id = 'page-3-audio';
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

  triggerCanvas();
})
