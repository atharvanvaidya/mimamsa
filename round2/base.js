var sixMinutes = 360;
var twoMinutes = 120;
var counterTwo = 0;
var counterSix = 0;
var startTimerFlag = 1;
var cSecTwo = document.getElementById('currentSecondsTwo');
var cMinTwo = document.getElementById('currentMinutesTwo');
var tSecTwo = document.getElementById('totalSecondsTwo');
var tMinTwo = document.getElementById('totalMinutesTwo');
var cSecSix = document.getElementById('currentSecondsSix');
var cMinSix = document.getElementById('currentMinutesSix');
var tSecSix = document.getElementById('totalSecondsSix');
var tMinSix = document.getElementById('totalMinutesSix');
var tog;

var resetTwo = document.getElementById('resetButtonTwo');
var startSix = document.getElementById('startButtonSix');
var resetSix = document.getElementById('resetButtonSix');
var sound = document.getElementById('alert');
sound.load();
console.log("Audio Track Loaded!");

resetTwo.addEventListener('click', resetTimerTwo);
startSix.addEventListener('click', startTimerSix);
resetSix.addEventListener('click', resetTimerSix);

function resetAll(){
  cSecTwo.innerHTML = "00";
  cMinTwo.innerHTML = "00";
  tSecTwo.innerHTML = "00";
  tMinTwo.innerHTML = "02";
  cSecSix.innerHTML = "00";
  cMinSix.innerHTML = "00";
  tSecSix.innerHTML = "00";
  tMinSix.innerHTML = "06";
}

function stylize(number) {
  if(number < 10){
    var finalString = "0"+number;
    return finalString;
  }
  else{
    return number;
  }
}

function toMMSS(totalSeconds) {
  return (stylize(parseInt(totalSeconds / 60)) + ":" + stylize(totalSeconds % 60));
}

function toTotalSeconds(minutes , seconds) {
  return parseInt(parseInt(minutes) * 60 + parseInt(seconds));
}

function countup() {
  counterTwo += 1;
  counterSix += 1;
  cSecTwo.innerHTML = stylize(counterTwo % 60);
  cMinTwo.innerHTML = stylize(parseInt(counterTwo / 60));
  cSecSix.innerHTML = stylize(counterSix % 60);
  cMinSix.innerHTML = stylize(parseInt(counterSix / 60));
  if (counterTwo == toTotalSeconds(tMinTwo.innerHTML , tSecTwo.innerHTML)) {
    resetTimerTwo();
    sound.play();
  }
  if (counterSix == toTotalSeconds(tMinSix.innerHTML , tSecSix.innerHTML)) {
    clearInterval(tog);
    sound.play();
    alert("Total Time Elapsed!");
  }
}

function resetTimerTwo() {
  clearInterval(tog);
  cSecTwo.innerHTML = "00";
  cMinTwo.innerHTML = "00";
  startTimerFlag = 1;
  console.log("TimerTwo Reset at " + toMMSS(counterTwo));
  counterTwo = 0;
}

function resetTimerSix() {
  clearInterval(tog);
  resetAll();
  startTimerFlag = 1;
  console.log("Both Timers Reset at " + toMMSS(counterTwo) + " and " + toMMSS(counterSix) + " respectively");
  counterTwo = 0;
  counterSix = 0;
}

function startTimerSix() {
  if (startTimerFlag == 1) {
    tog = setInterval(function() {countup()}, 80);
    console.log("Both Timers Started!");
    startTimerFlag = 0;
  }
  else {
    console.log("Timer is Already Running!");
  }
}
