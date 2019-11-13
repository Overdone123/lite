var audio = document.getElementById("audio");

window.onload = () => {
  play();
  getPage();
    updateStats();
  setInterval(() => updateStats(), 1000);
}

function play() {
  audio.play();
  $("#play").attr("style", "display: none;")
  $("#pause").attr("style", "display: block;")
}

function pause() {
  audio.pause();
  $("#pause").attr("style", "display: none;")
  $("#play").attr("style", "display: block;")
}

function updateStats() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.getElementById('listeners').innerHTML = data.listeners.current + " LISTENERS";
      document.getElementById('dj').innerHTML = data.live.is_live ? data.live.streamer_name : 'Gravity Stream';
      document.getElementById('song').innerHTML = data.now_playing.song.text;
      let dj = data.live.is_live ? 'DJ ' + data.live.streamer_name : 'Gravity Stream';
    }
  };
  xhttp.open('GET', 'https://r.gravityradio.pw/api/nowplaying/1', true);
  xhttp.send();
}

function getPage() {

  var hash = window.location.hash;
  var page = hash.slice(1).split('?')[0].toLowerCase();
  var path = window.location.href.split('/').slice(4).join('/');
  if (!hash) return window.location.href = '/lite/#Home'
  if (!page) return window.location.href = '/lite/#Home'



  $.get(`/api/lite/pagerouter?page=${page}&nocache=${new Date().getTime()}`, (res) => {
    if (res.error) {

    } else {
      console.log(res.data)
      $('#page-content').html(res.data);
    };
  });
};

window.onhashchange = () => {
  console.log(window.location.hash)
  getPage()
};