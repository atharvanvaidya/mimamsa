var currentMin = document.getElementById('currentMinutes');
var currentSec = document.getElementById('currentSeconds');
var totalMin = document.getElementById('totalMinutes');
var totalSec = document.getElementById('totalSeconds');
var buzzerSec = document.getElementById('buzzSeconds');
var start = document.getElementById('startButton');
var reset = document.getElementById('resetButton');
var resetBuzzer = document.getElementById('resetBuzzerButton');
var buzz = 20;
var buzzFlag = 0;
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
resetBuzzer.addEventListener('click' , onBuzzerReset);

//Add 0 when the timer is less than 10
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

//Resets the Timer to Defaut Value
function clearAll() {
  currentMin.innerHTML = "00";
  currentSec.innerHTML = "00";
  totalMin.innerHTML = "02";
  totalSec.innerHTML = "00";
  buzzerSec.innerHTML = "20";
}

//Convert Total Seconds to MM:SS
function toMMSS(totalSeconds) {
  return (stylize(parseInt(totalSeconds / 60)) + ":" + stylize(totalSeconds % 60));
}

//Convert MM:SS to Total Seconds
function toTotalSeconds(minutes , seconds) {
  return parseInt(parseInt(minutes) * 60 + parseInt(seconds));
}

//Main Counter Function
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
  if (buzzFlag == 1) {
    buzzerSec.innerHTML = stylize(buzz);
    buzz -= 1;
    if (buzz == -1) {
      buzzFlag = 0;
      buzz = 20;
    }
  }
  if (counter == toTotalSeconds(totalMin.innerHTML , totalSec.innerHTML)) {
    clearInterval(tog);
    alert("Time Completed! Press Reset Button to Start Again!");
    //clearAll();
    emptyArray();
    counter = 0;
    inputFlag = 0;
  }
}

//Executes when Start Button is Pressed
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

//Pushes A/B/C/W to array
function pushLetter(letter) {
  if (arr.includes(letter) == false) {
    if (arr.length == 0) {
      //Play Sound
      buzzFlag = 1;
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

//Executes when A,B,C,W is Pressed
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
        console.log("W Pressed");
        pushLetter("w");
        break;
    }
    console.log(arr);
  }
}

//Executes when Timer Reset Button is Pressed
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

//Executes when Buzzer Reset Button is Pressed
function onBuzzerReset() {
  buzzFlag = 0;
  buzzerSec.innerHTML = "20";
  buzz = 20;
}
