window.onload = function() {
  var container = document.getElementById('container');
  var pages = document.querySelectorAll('.page');
  var slip = Slip(container, 'y').webapp(pages);
}
