let oakaudio = new Audio("../audio/oakneu.mp3");
let title = new Audio("../audio/title.mp3");
let username = document.getElementById('username');
let rivalName = document.getElementById('rivalname');
let gender = "Boy";
let used = 0;
let eventcounter = 1;
function startPage(){
document.getElementById('gameStart').style.display = "block";
}
startPage()
function continueDialog() {
    if (currentLine == 8 || currentLine == 10 || currentLine == 15) {
        document.getElementById('continue-btn').style.display = "none";
    } else if (currentLine == 9) {
        if (gender == "Boy") {
            document.getElementById('professor-img').src = "../img/boy-full.png";
        } else {
            document.getElementById('professor-img').src = "../img/girl-full.png";
        }
    } else if (currentLine == 12) {
        if (gender == "Girl") {
            document.getElementById('professor-img').src = "../img/boy-full.png";
        } else {
            document.getElementById('professor-img').src = "../img/girl-full.png";
        }   
    }
    const dialogBox = document.getElementById('dialog-box');
    if (currentLine < dialogLines.length) {
        dialogBox.innerHTML = `<p>${dialogLines[currentLine]}</p>`;
        currentLine++;
    } else {
        window.location.href = "./game_main.html";
    }
}
function skip() {
    window.location.href = "./game_main.html";
}

let beforeGame = document.getElementById('beforegame');
let continuebutton = document.getElementById('continue-btn');

document.addEventListener('keydown', function(event) {
 if (beforeGame.style.display !== "none" && continuebutton.style.display !== "none" && used < 10) {
     if (event.key === 'Enter' || event.keyCode === 13 && eventcounter == 2) {
         continueDialog();
         used++;
     }
 }
});

let dialogLines = [
    "Hello, there! Welcome to the world of Pokemon!",
    "My name is OAK. People affecttionaly refer to me as the POKEMON PROFESSOR.",
    "This world...",
    "...is inhabited far and wide by creatures called Pokemon. For some people, Pokemon are pets. Others use them for battling.",
    "As for myself...",
    "I study Pokemon as a profession.",
    "But first, tell me a little about yourself.",
    "Now tell me. Are you a boy? Or a you a girl?",
    `<button id="boy" onclick="SetGender(1)">BOY</button><button id="girl" onclick="SetGender(2)">GIRL</button>`,
    "Let's begin with your name. What is it?",
    `<input type="text" name="yourname" id="yourname"><button id="user" onclick="SetName()">Start</button>`,
    "This is my grandchild.", 
    "They have been your rival since you both were babies.",
    "...Erm, what is their name again?",
    `<button id="maybenull" onclick="SetRivalname(0)">SERENA</button><button id="maybeone" onclick="SetRivalname(1)">BLUE</button><button id="maybetwo" onclick="SetRivalname(2)">GARY</button><button id="maybethree" onclick="SetRivalname(3)">MAY</button><button id="maybefour" onclick="SetRivalname(4)">MARTIN</button>`

];
function SetRivalname(number) {
    currentLine = 0;
    let names = ["Serena", "Blue", "Gary", "May", "Martin"];
    let rivalName = names[number];
    
    dialogLines.splice(0, 0, "Erm, was it " + rivalName + "?");
    dialogLines.unshift("That's right! I remember now! Their name is " + rivalName + "!");
    
    dialogLines = [
        username + "!",
        "Your very own Pokemon legend is about to unfold!",
        "A world of dreams and adventures with Pokemon awaits! Let's go!",
        "Wait! " + username + "!",
        "I have something for you!",
        "Take this Pokemon with you.",
        "It is located at the top left"
    ];

    document.getElementById('continue-btn').style.display = "block";
    document.getElementById('continue-btn').style.marginLeft = "47%";
}

let currentLine = 0;
function SetGender(number) {
if (number == 1) {
    gender = "Boy";
} else{
gender = "Girl";
}

sessionStorage['gender'] = gender;
document.getElementById('continue-btn').style.display = "block";
document.getElementById('continue-btn').style.marginLeft = "47%";
}

function SetName() {
    username = document.getElementById('yourname').value;
    sessionStorage['name'] = username;
    let insertionIndex = currentLine; 
    dialogLines.splice(insertionIndex, 0, 'Right! So your name is ' + username + '.');

    document.getElementById('continue-btn').style.display = "block";
    document.getElementById('continue-btn').style.marginLeft = "47%";
    used = 0;
}

document.getElementById('video').addEventListener('ended', function() {
    document.getElementById('videostart').style.display = 'none';
    document.getElementById('startscreen').style.display = 'block';
    document.getElementById('startscreen').style.backgroundImage = "linear-gradient(to right, #000000, #4a4a4a, #000000)";
       
    title.play();
    title.loop = true;
});

let startScreen = document.getElementById('startscreen');

let starterFunction = function(event) {
  if (startScreen.style.display !== "none" && document.getElementById('videostart').style.display === "none") {
    if (event.key === 'Enter' || event.keyCode === 13 && eventcounter == 1) {
      finishStart();
      used++;
      title.loop = false;
      title.pause();
      eventcounter++;
      document.removeEventListener('keydown', starterFunction);
    }
  }
};

document.addEventListener('keydown', starterFunction);

function finishStart(){    
    oakaudio.play();
    oakaudio.loop = true;
    document.getElementById('startscreen').style.display = "none";
    document.getElementById('beforegame').style.display = "block";
    used = 0;
}