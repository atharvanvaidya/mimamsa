var currentMin = document.getElementById('currentMinutes');
var currentSec = document.getElementById('currentSeconds');
var totalMin = document.getElementById('totalMinutes');
var totalSec = document.getElementById('totalSeconds');
var s = document.getElementsByTagName('span');


var start = document.getElementById('startButton');
var reset = document.getElementById('resetButton');
var sound = document.getElementById('alert');
sound.load();
console.log("Audio Track Loaded!");

var killFlag = 0;
var pauseFlag = 0;
var completeFlag = 1;

function clearAll() {
  totalMin.value = "00";
  totalSec.value = "00";
  currentMin.innerHTML = "00";
  currentSec.innerHTML = "00";
}
clearAll();

start.addEventListener('click',startPauseFunction);
reset.addEventListener('click',resetFunction);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function countup() {
  var cMin = parseInt(currentMin.innerHTML, 10);
  var cSec = parseInt(currentSec.innerHTML, 10);
  var tMin = parseInt(totalMin.value, 10);
  var tSec = parseInt(totalSec.value, 10);

  var remainingSeconds = ((tMin * 60 + tSec) - (cMin * 60 + cSec));
  if (tMin < 10) {
    totalMin.value = "0" + tMin;
  }
  if(tSec < 10){
    totalSec.value = "0" + tSec;
  }
  while (remainingSeconds > -300) {
    if(killFlag == 1 || pauseFlag == 1){
      completeFlag = 0;
      break ;
    }
    await sleep(1000);
    cSec += 1;
    if(cSec == 60){
      cMin += 1;
      cSec = 0;
    }
    if(cMin < 10){
      currentMin.innerHTML = "0" + cMin;
    }
    else {
      currentMin.innerHTML = cMin;
    }
    if (cSec < 10) {
      currentSec.innerHTML = "0" + cSec;
    }
    else{
      currentSec.innerHTML = cSec;
    }
    remainingSeconds -= 1;
    if (remainingSeconds > 0) {
      if(remainingSeconds < 20 && remainingSeconds % 2 == 0){
        s["0"].style.color = "red";
        s["1"].style.color = "red";
      }
      else {
        s["0"].style.color = "white";
        s["1"].style.color = "white";
      }
    }
    else if (remainingSeconds == 0) {
      sound.play();
    }
    else {
      s["0"].style.color = "red";
      s["1"].style.color = "red";
    }
  }
  if(completeFlag == 1){
    start.innerHTML = "Start!";
    //alert("Time Completed!");

    //remainingSeconds = 300;
    //clearAll();
    s["0"].style.color = "white";
    s["1"].style.color = "white";
  }
}

function startPauseFunction(){
  if(isNaN(parseInt(totalMin.value)) || isNaN(parseInt(totalSec.value))){
    alert("Enter the Input Correctly!");
  }
  else if (totalSec.value >= 60) {
    alert("Enter the Seconds between 0 to 59!");
  }
  else{
    if(start.innerHTML === "Start!"){
      console.log("Timer Started!");
      start.innerHTML = "Pause!";
      killFlag = 0;
      pauseFlag = 0;
      completeFlag = 1;
    }
    else{
      console.log("Timer Paused!");
      start.innerHTML = "Start!";
      killFlag = 0;
      pauseFlag = 1;
      completeFlag = 1;
    }
    countup();
  }
}

function resetFunction(){
  killFlag = 1;
  console.log("Timer Reset!");
  start.innerHTML = "Start!";
  pauseFlag = 1;
  completeFlag = 0;
  s["0"].style.color = "white";
  s["1"].style.color = "white";
  clearAll();
}
