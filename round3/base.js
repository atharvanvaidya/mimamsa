var currentMin = document.getElementById('currentMinutes');
var currentSec = document.getElementById('currentSeconds');
var totalMin = document.getElementById('totalMinutes');
var totalSec = document.getElementById('totalSeconds');
var start = document.getElementById('startButton');
var reset = document.getElementById('resetButton');
var inputFlag = 0;
var counter = 0;
var completeFlag = 0;
var arr = [];
startTimerFlag = 1;
start.addEventListener('click' , onRoundStart);
reset.addEventListener('click' , onReset);
document.addEventListener("keypress", onPress);
var sound = document.getElementById('alert');
sound.load();

function stylize(number) {
  if(number < 10){
    var finalString = "0"+number;
    return finalString;
  }
  else{
    return number;
  }
}

function emptyArray() {
  arr = [];
}

function clearAll() {
  currentMin.innerHTML = "00";
  currentSec.innerHTML = "00";
  totalMin.innerHTML = "02";
  totalSec.innerHTML = "00";
}

function toMMSS(totalSeconds) {
  return (stylize(parseInt(totalSeconds / 60)) + ":" + stylize(totalSeconds % 60));
}

function toTotalSeconds(minutes , seconds) {
  return parseInt(parseInt(minutes) * 60 + parseInt(seconds));
}

function countup() {
  if (arr.length == 4) {
    document.removeEventListener("keypress" , onPress);
    inputFlag = 0;
    clearInterval(tog);
    completeFlag = 1;
    emptyArray();
  }
  counter += 1;
  currentSec.innerHTML = stylize(counter % 60);
  currentMin.innerHTML = stylize(parseInt(counter / 60));
  if (counter == toTotalSeconds(totalMin.innerHTML , totalSec.innerHTML)) {
    clearInterval(tog);
    alert("Time Completed! Press Reset Button to Start Again!");
    //clearAll();
    emptyArray();
    counter = 0;
    inputFlag = 0;
  }
}

function onRoundStart() {
  if (startTimerFlag == 1) {
    tog = setInterval(function() {countup()}, 80);
    inputFlag = 1;
    document.addEventListener("keypress" , onPress);
    startTimerFlag = 0;
    start.innerHTML = "Pause!";
  }
  else {
    if (completeFlag == 0) {
      clearInterval(tog);
      start.innerHTML = "Start!";
      startTimerFlag = 1;
    }
    else {
      startTimerFlag = 0;
    }
  }
}

function pushLetter(letter) {
  if (arr.includes(letter) == false) {
    if (arr.length == 0) {
      //Play Sound
      sound.play();
      console.log("Song ");
    }
    arr.push(letter);
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(letter));
    li.setAttribute("id", "element"); // added line
    ul.appendChild(li);
  }
}

function onPress(event) {
  if (inputFlag == 1) {
    console.log("Event Started");
    switch (event.key) {
      case "a":
        console.log("A Pressed");
        pushLetter("a");
        break;
      case "b":
        console.log("B Pressed");
        pushLetter("b");
        break;
      case "c":
        console.log("C Pressed");
        pushLetter("c");
        break;
      case "d":
        console.log("D Pressed");
        pushLetter("d");
        break;
    }
    console.log(arr);
  }
}

function onReset() {
  clearAll();
  clearInterval(tog);
  emptyArray();
  inputFlag = 0;
  counter = 0;
  startTimerFlag = 1;
  start.innerHTML = "Start!";
  var ul = document.getElementById('list');
  if (ul) {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }
}
