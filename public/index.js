var vid = document.getElementById("pourVid");

function enableMute() {
  vid.muted = true;
}

function disableMute() {
    vid.muted = false;
}

function checkMute() {
    alert(vid.muted);
}

function skipOpen() {
  vid.currentTime=4;
}

$(function() {
  skipOpen();
});
