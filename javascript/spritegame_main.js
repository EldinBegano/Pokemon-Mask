   /***********************************
        * INIT
        * **********************************/
   let player = document.getElementById('player');
   let spriteImg = document.getElementById('spriteImg');
   let surface = document.getElementById('surface');
   let oakaudio = new Audio("./audio/oakneu.mp3");
   let title = new Audio("./audio/title.mp3");
   let gamefreak = new Audio("./audio/gamefreak.mp3");
   let collect = new Audio("./audio/collect.mp3");
   let evolution = new Audio("./audio/evo.mp3");
   let back = new Audio("./audio/backgroundmusic.mp3");
   let rivalcounter = 14;
   let needed = false;
   let startButton = document.getElementById('startButton');
   let debug_output = document.getElementById('debug_output');
   let username = document.getElementById('username');
   let rivalName = document.getElementById('rivalname');
   let gender = "Boy"
   let pokenumber = 0;
   let pokerivalnumber = 0;
   let evoimg = "";
   let rivalevoimg = "";
   let tvnfc = "";
   let used = 0;
   let cnfwf = 0;
   let watchedCredits = false;
   let counter = 2;
   let movementblocker = false;
   let battlecounter = 8;
   let eeveenumbers = [133, 134, 135, 136, 196, 197, 470, 471, 700]
   let eeveeimg = "";
   let eeveecounter = 0;
   let keybinds = 1;
   let randompokemon = ["./img/Flygon.png", "./img/Zytomega.png", "./img/Zoroark.png", "./img/Mitodos.png", "./img/Vibrava.png", "./img/Kadabra.png"]
    let allpokemon = [];
    let randoms = [
        Math.floor(Math.random() * allpokemon.length),
        Math.floor(Math.random() * allpokemon.length),
        Math.floor(Math.random() * allpokemon.length),
        Math.floor(Math.random() * allpokemon.length),
        Math.floor(Math.random() * allpokemon.length),
        Math.floor(Math.random() * allpokemon.length)
       ]
   // Scale the surface to 80% of the screen width

  
   
   /***********************************
    * GAME CONFIG
    * **********************************/
   let spriteImgNumber = 0; // current animation part of sprite image
   let gameSpeed = 24; // game loop refresh rate (pictures per second)
   let characterSpeed = 5; // move offset in PX
   
   
 /***********************************
    * Menu
    * **********************************/
   function quitAll(){
         window.close();
    }
    function quitTheGame(){
    document.getElementById('game').style.display = "none";
    document.getElementById('opener').style.display = "block";
    stoppuhr.stop();
    stoppuhr.clear();
    back.loop = false;
    back.pause();
    document.getElementById('clock').style.display = "none";
    resumeBox.style.display = 'none';
    }

       function openOptions(){
        if (document.getElementById('opener').style.display !== "none") {
        document.getElementById('menucontent').innerHTML = "";
        document.getElementById('btns').style.display = "none"
        document.getElementById('menucontent').style.display = "block";
        document.getElementById('menucontent').innerHTML = `
        <h1 onclick="backToStart()">Options</h1>
        <h2>Master Volume:</h2><input type="range" name="music" id="masterrange" class="musicrange" onchange="masterVolume()">
        <br>
        <h2>Special Effects Volume:</h2><input type="range" name="music" id="specialrange" class="musicrange" onchange="specialVolume()"
        <br>
        <h2>Music Volume:</h2><input type="range" name="music" id="musicrange" class="musicrange" onchange="musicVolume()">
        <br>
        <h2>Keybinds</h2><button id="setarrows" class="back-btns" onclick="SetKeybinds(1)">Arrows</button><button id="setwasd" class="back-btns" onclick="SetKeybinds(2)">WASD</button>`;
       } else {
        document.getElementById('menucontent2').innerHTML = "";
        document.getElementById('escape-Box').style.display = "none"
        document.getElementById('menucontent2').style.display = "block";
        document.getElementById('menucontent2').innerHTML = `
        <h1 onclick="backToStart()">Options</h1>
        <h2>Master Volume:</h2><input type="range" name="music" id="masterrange2" class="musicrange" onchange="masterVolume()">
        <br>
        <h2>Special Effects Volume:</h2><input type="range" name="music" id="specialrange2" class="musicrange" onchange="specialVolume()"
        <br>
        <h2>Music Volume:</h2><input type="range" name="music" id="musicrange2" class="musicrange" onchange="musicVolume()">
        <br>
        <h2>Keybinds</h2><button id="setarrows" class="back-btns" onclick="SetKeybinds(1)">Arrows</button><button id="setwasd" class="back-btns" onclick="SetKeybinds(2)">WASD</button>`;
       
       }
    }

function backToStart(){
    if (document.getElementById('opener').style.display !== "none") {
    document.getElementById('menucontent').style.display = "none";
    document.getElementById('btns').style.display = "block";
} else{
    document.getElementById('menucontent2').style.display = "none";
    document.getElementById('escape-Box').style.display = "block";
}
}
function musicVolume(){
    let musicrange = 0;
    if (document.getElementById('opener').style.display !== "none") {
     musicrange = document.getElementById('musicrange');
    } else {
     musicrange = document.getElementById('musicrange2');
    }
    console.log(musicrange.value/100);
    back.volume = musicrange.value /100;
    oakaudio.volume = musicrange.value / 100;
    title.volume = musicrange.value / 100;
    gamefreak.volume = musicrange.value / 100;
}
function specialVolume(){
    let specialrange = 0;
    if (document.getElementById('opener').style.display !== "none") {
        specialrange = document.getElementById('specialrange');
    } else {
        specialrange = document.getElementById('specialrange2');
    }
    collect.volume = specialrange.value / 100;
    evolution.volume = specialrange.value / 100;
}
function masterVolume(){
    let masterrange = 0;
    if (document.getElementById('opener').style.display !== "none") {
        masterrange = document.getElementById('masterrange');
    } else {
        masterrange = document.getElementById('masterrange2');
    }
    back.volume = masterrange.value / 100;
    oakaudio.volume = masterrange.value / 100;
    title.volume = masterrange.value / 100;
    gamefreak.volume = masterrange.value / 100;
    collect.volume = masterrange.value / 100;
    evolution.volume = masterrange.value / 100;
}
function SetKeybinds(number){
    if (number == 1) {
        keybinds = 1;
    } else {
        keybinds = 2;
    }
}

function openAchievements(){
    if (document.getElementById('opener').style.display !== "none") {
        document.getElementById('menucontent').innerHTML = "";
        document.getElementById('btns').style.display = "none"
        document.getElementById('menucontent').style.display = "block";
        document.getElementById('menucontent').innerHTML = `
    <h1 onclick="backToStart()">Achievements</h1>
    <div class="column">
    <div class="context">
    <img src="./img/achievement1.png" alt="" class="achievement-image">
    <p class="achievement">Find the Easter-Egg<br>
    <span class="game-title">Find Turtok which will lead you somewhere</span></p>
    </div><br>
    <div class="context">
    <img src="./img/logo1better.png" alt="" class="achievement-image" id="creditachievement">
    <p class="achievement">Watch the Credits<br>
    <span class="game-title">Watch the Credits to unlock</span></p>
    </div><br>
    <div class="context">
    <img src="./img/Magikarp.png" alt="" class="achievement-image">
    <p class="achievement">Beat It<br>
    <span class="game-title">Beat the Game</span></p>
    </div><br>
    <div class="context">
    <img src="./img/thechosenone.png" alt="" class="achievement-image">
    <p class="achievement">The Chosen One<br>
    <span class="game-title">Catch the Chosen One as a Pokemon</span></p>
    </div><br>`
    ;
    if (watchedCredits == true) {
        document.getElementById('creditachievement').style.filter = "grayscale(0%)";
        }
    } else {
        document.getElementById('menucontent2').innerHTML = "";
        document.getElementById('escape-Box').style.display = "none"
        document.getElementById('menucontent2').style.display = "block";
        document.getElementById('menucontent2').innerHTML = `<h1 onclick="backToStart()">Achievements</h1>
        <div class="column">
        <div class="context">
        <img src="./img/achievement1.png" alt="" class="achievement-image">
        <p class="achievement">Find the Easter-Egg<br>
        <span class="game-title">Find Turtok which will lead you somewhere</span></p>
        </div><br>
        <div class="context">
        <img src="./img/logo1better.png" alt="" class="achievement-image" id="creditachievement">
        <p class="achievement">Watch the Credits<br>
        <span class="game-title">Watch the Credits to unlock</span></p>
        </div><br>
        <div class="context">
        <img src="./img/Magikarp.png" alt="" class="achievement-image">
        <p class="achievement">Beat It<br>
        <span class="game-title">Beat the Game</span></p>
        </div><br>
        <div class="context">
    <img src="./img/thechosenone.png" alt="" class="achievement-image">
    <p class="achievement">The Chosen One<br>
    <span class="game-title">Catch the Chosen One as a Pokemon</span></p>
    </div><br>`;
        if (watchedCredits == true) {
            document.getElementById('creditachievement').style.filter = "grayscale(0%)";
            }
    }
}
function openCredits(){
    document.getElementById('t').style.opacity = 0;
    document.getElementById('menucontent').innerHTML = "";
        document.getElementById('btns').style.display = "none"
        document.getElementById('menucontent').style.display = "block";
        document.getElementById('menucontent').innerHTML = `
    <div class='animate'>
<div class='credits'>Credits</div>
    <p>Music: Kshinder</p>
    <p>Sound: SoundImage</p>
    <p>Idea: Eldin</p>
    <p>Programming: Eldin</p>
    <p>Graphics: Eldin</p>
    <p>Story: Game Freak</p>
    <p>Design: Eldin</p>
</div>`;
setTimeout(function(){
    document.getElementById('t').style.opacity = 1;
    watchedCredits = true;
    backToStart();
}, 10000);
}
 /***********************************
    * Video
    * **********************************/
function startVideo(){
    document.getElementById('gameStart').style.display = 'block';
    document.getElementById('opener').style.display = 'none';
    gamefreak.play();
}

 document.getElementById('video').addEventListener('ended', function() {
    gamefreak.pause();
    document.getElementById('videostart').style.display = 'none';
    document.getElementById('startscreen').style.display = 'block';
    document.getElementById('startscreen').style.backgroundImage = "linear-gradient(to right, #000000, #4a4a4a, #000000)";
       
    title.play();
    title.loop = true;
});

let eventcounter = 1;
  /***********************************
    * Startscreen
    * **********************************/
   
  let startScreen = document.getElementById('startscreen');
  document.addEventListener('keydown', function(event) {
    if (used < 1 && startScreen.style.display !== "none" && document.getElementById('videostart').style.display === "none") {
        if (event.key === 'Enter' || event.keyCode === 13 && eventcounter == 1) {
            finishStart();
            used++;
            title.loop = false;
            title.pause();
        eventcounter++;
        }
    }
});

function finishStart(){
    
    oakaudio.play();
    oakaudio.loop = true;
    document.getElementById('startscreen').style.display = "none";
    document.getElementById('beforegame').style.display = "block";
    used = 0;
}

   /***********************************
    * Escape Button
    * **********************************/
   let game = document.getElementById('game');
   let gamestop = false;
document.addEventListener('keydown', function(e) {
    var resumeBox = document.getElementById('resumeBox');
    if (e.key === "Escape" && game.style.display !== "none") {
        if (resumeBox.style.display === 'none') {
            resumeBox.style.display = 'flex';
            stoppuhr.stop();
            gamestop = true;
        } else {
            resumeBox.style.display = 'none';
            stoppuhr.start();
            gamestop = false;
            gameLoop();
        }
    }
});

document.getElementById('resumeButton').addEventListener('click', function() {
    document.getElementById('resumeBox').style.display = 'none';
    stoppuhr.start();
    gamestop = false;
    gameLoop();
});

   /***********************************
    * EVENT LISTENER
    * **********************************/
   document.onkeydown = keydown_detected;
   document.onkeyup = keyup_detected;
   
   let leftArrow = false;
   let rightArrow = false;
   let upArrow = false;
   let downArrow = false;
   
   function keydown_detected(e){
       //console.log(e);
       //console.log(e.keyCode);
       if (keybinds == 1) {
       if (!e){
           e = window.event; //Internet Explorer
       }
       if (e.keyCode == 37){ // leftArrow
           leftArrow = true;
       }
       if (e.keyCode == 38){ //upArrow
           upArrow = true;
       }
       if (e.keyCode == 39){ // rightArrow
           rightArrow = true;
       }
       if (e.keyCode == 40){ // downArrow
           downArrow = true;
       }
       } else {
        if (!e){
            e = window.event; //Internet Explorer
        }
        if (e.keyCode == 65){ // 'A' key
            leftArrow = true;
        }
        if (e.keyCode == 87){ // 'W' key
            upArrow = true;
        }
        if (e.keyCode == 68){ // 'D' key
            rightArrow = true;
        }
        if (e.keyCode == 83){ // 'S' key
            downArrow = true;
        }
       }
   }
   function keyup_detected(e){
       //console.log(e);
       //console.log(e.keyCode);
       if (keybinds == 1) {
       if (!e){
           e = window.event; //Internet Explorer
       }
       if (e.keyCode == 37){ // leftArrow
           leftArrow = false;
       }
       if (e.keyCode == 38){ //upArrow
           upArrow = false;
       }
       if (e.keyCode == 39){ // rightArrow
           rightArrow = false;
       }
       if (e.keyCode == 40){ // downArrow
           downArrow = false;
       }
       } else {
        if (!e){
            e = window.event; //Internet Explorer
        }
        if (e.keyCode == 65){ // 'A' key
            leftArrow = false;
        }
        if (e.keyCode == 87){ // 'W' key
            upArrow = false;
        }
        if (e.keyCode == 68){ // 'D' key
            rightArrow = false;
        }
        if (e.keyCode == 83){ // 'S' key
            downArrow = false;
        }
       }
   }
   

   let link = "";
   let pokemoncounter = 0;
   let limit = 905;
   //Load all pokemon
   function loadPokemon() {

    fetch("https://pokeapi.co/api/v2/pokemon?limit=905&offset=0")
    .then( (response) => {
      return response.json();
    })
    .then( (pokemon) => {
      console.log(pokemon);
      for (let I = 0; I < limit; I++) {
        link = pokemon.results[pokemoncounter++].url;
        loadsinglePokemon(link);      
      }
      
    }
    )
    .catch( (error) => {
      console.log('Error: ', error);
    })
  }
  loadPokemon()
 function loadsinglePokemon(link){
    fetch(link)
    .then( (response) => {
      return response.json();
    })
    .then( (pokemon) => {
      allpokemon.push(pokemon.sprites.front_default);
    }
    )
    .catch( (error) => {
      console.log('Error: ', error);
    })
  }

   let starters = document.querySelector('.starters');
   
   starters?.addEventListener('click', (event) => {
       let starterContainer = event.target.closest('.starter-container');
   
       if (starterContainer) {
          let isActive = starterContainer.classList.contains('active');
           starters.querySelectorAll('.starter-container.active')?.forEach((container) => {
               container.classList.remove('active');
           });
   
           if (!isActive) {
               starterContainer.classList.add('active');
           }
       }
   });
   let starterpokemon = "";
   let rivalstarterpokemon = "";
   function setStarter(number){
    oakaudio.loop = false;
    oakaudio.pause();
    document.getElementById('clock').style.display = "block";
    stoppuhr.start();
   if (number == 1) {
       starterpokemon = "Bulbasaur";
       pokenumber = 1;
       rivalstarterpokemon = "Froakie"
       pokerivalnumber = 656;
       evoimg = loadNeededPokemon(pokenumber+2);
       rivalevoimg = loadNeededPokemon(pokerivalnumber+2);
   } else if (number == 2) {
       starterpokemon = "Torchic";
       pokenumber = 255;
       rivalstarterpokemon = "Bulbasaur"
       pokerivalnumber = 1;
       evoimg = loadNeededPokemon(pokenumber+2);
       rivalevoimg = loadNeededPokemon(pokerivalnumber+2);
   } else if (number == 3) {
       starterpokemon = "Froakie";
       pokenumber = 656;
       rivalstarterpokemon = "Torchic"
       pokerivalnumber = 255;
       evoimg = loadNeededPokemon(pokenumber+2);
       rivalevoimg = loadNeededPokemon(pokerivalnumber+2);
   } else {
    starterpokemon = "Fuecoco"
    pokenumber = 810;
    rivalstarterpokemon = "Bulbasaur"
    pokerivalnumber = 1;
    evoimg = loadNeededPokemon(pokenumber+2);
    rivalevoimg = loadNeededPokemon(pokerivalnumber+2);
   }
   if (starterpokemon != "") {
       document.getElementById('afterbeforegame').style.display = "none";
       document.getElementById('game').style.display = "block";
       document.getElementById('surface').style.height = "600px";
       document.getElementById('surface').style.width = "1000px";
        back.play();
        back.loop = true;
       document.getElementById('1').src = "./img/" + starterpokemon + ".png";
       document.getElementById('7').src = "./img/" + starterpokemon + ".png";
       document.getElementById('13').src = "./img/" + rivalstarterpokemon + ".png";
   }
   }


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
   document.getElementById('continue-btn').style.display = "block";
   document.getElementById('continue-btn').style.marginLeft = "47%";
   }
   
   function SetName() {
       username = document.getElementById('yourname').value;    
       let insertionIndex = currentLine; 
       dialogLines.splice(insertionIndex, 0, 'Right! So your name is ' + username + '.');
   
       document.getElementById('continue-btn').style.display = "block";
       document.getElementById('continue-btn').style.marginLeft = "47%";
       used = 0;
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
   function continueDialog() {
        if (currentLine == 8 || currentLine == 10 || currentLine == 15) {
            document.getElementById('continue-btn').style.display = "none";
        } else if (currentLine == 9) {
            if (gender == "Boy") {
                document.getElementById('professor-img').src = "./img/boy-full.png";
            } else {
                document.getElementById('professor-img').src = "./img/girl-full.png";
            }
        } else if (currentLine == 12) {
            if (gender == "Girl") {
                document.getElementById('professor-img').src = "./img/boy-full.png";
            } else {
                document.getElementById('professor-img').src = "./img/girl-full.png";
            }   
        }
        const dialogBox = document.getElementById('dialog-box');
        if (currentLine < dialogLines.length) {
            dialogBox.innerHTML = `<p>${dialogLines[currentLine]}</p>`;
            currentLine++;
        } else {
            document.getElementById('beforegame').style.display = "none";
            document.getElementById('afterbeforegame').style.display = "block";
            document.getElementById('surface').style.height = "600px";
            document.getElementById('surface').style.width = "1000px";
            startGame();
        }
    }

   
   /***********************************
    * GAME LOOP
    * **********************************/
   function startGame() {
       if (gender == "Boy") {
       document.getElementById('spriteImg').src = "./img/sprites2.png";
       } else {
           document.getElementById('spriteImg').src = "./img/spritesg_1.png";
       }
       player.style.left = '350px'; // starting position
       player.style.top = '180px'; // starting position
       player.style.opacity = '1'; // show player
       spriteImg.style.right = '0px'; // starting animation
       gameLoop();
   }
   
   function gameLoop() {
   if (surface.style.display !== "none" && movementblocker == false && gamestop == false){
       if(leftArrow && parseFloat(player.style.left)== 0) {
           movePlayer((-1)*characterSpeed, 0, -1);
           spriteImg.style.bottom = "40px";
           movePlayer(975, 0, -1)
           animatePlayer();
       }else if (leftArrow) {
           movePlayer((-1)*characterSpeed, 0, -1);
           animatePlayer();
           spriteImg.style.bottom = "40px";
       }
       if(rightArrow && parseFloat(player.style.left)== 975) {
           movePlayer(characterSpeed, 0, 1)
           spriteImg.style.bottom = "40px";
           animatePlayer();
           movePlayer(-975, 0, -1)
       }else if (rightArrow) {
           movePlayer(characterSpeed, 0, 1)
           animatePlayer();
           spriteImg.style.bottom = "40px";
       }
       if(upArrow && parseFloat(player.style.top) == 0) {
           movePlayer(0, (-1)*characterSpeed, 0);
           spriteImg.style.bottom = "162px";
           animatePlayer();
           movePlayer(0,560,0)
       } else if (upArrow){
           movePlayer(0, (-1)*characterSpeed, 0);
           animatePlayer()
           spriteImg.style.bottom = "162px";
       }
       if(downArrow && parseFloat(player.style.top) == 560) {
           movePlayer(0, characterSpeed, 0);
           spriteImg.style.bottom = "97px";
           animatePlayer();
           movePlayer(0,-560,0)
       }else if (downArrow){
           movePlayer(0, characterSpeed, 0);
           spriteImg.style.bottom = "97px";
           animatePlayer()
       }
   
       setTimeout(gameLoop, 1000/gameSpeed); // async recursion
    }
   }
function skip() {
    document.getElementById('beforegame').style.display = "none";
document.getElementById('afterbeforegame').style.display = "block";
document.getElementById('surface').style.height = "600px";
document.getElementById('surface').style.width = "1000px";
startGame();
}

    const gameContainer = document.getElementById('surface');
    let collectible = document.getElementById('collectible');
    let collectibleCounter = 0;
   
   /***********************************
    * MOVE
    * **********************************/
   /**
    * @param {number} dx - player x move offset in pixel
    * @param {number} dy - player y move offset in pixel
    * @param {number} dr - player heading direction (-1: move left || 1: move right || 0: no change)
    */

   function movePlayer(dx, dy, dr){
       // current position
       let x = parseFloat(player.style.left);
       let y = parseFloat(player.style.top);
       
       // calc new position
       x += dx;
       y += dy;
       
       // assign new position
       player.style.left = x + 'px';
       player.style.top = y + 'px';
   
       // handle direction
       if(dr != 0) {
           player.style.transform = `scaleX(${dr})`;
       }
       if (isColliding(player, collectible, 3)) {
        collect.play();
        if (counter < 7) {
            document.getElementById(counter++).src = document.getElementById('image').src;
            document.getElementById(battlecounter++).src = document.getElementById('image').src
            collectible.style.display = 'none';
setTimeout(function(){
            placeCollectible();
}, 1800);
        }
        else if (counter == 3){
            for (let index = 2; index < 7; index++) {
                const element = array[index];
                
            }
        }
         else if (counter == 7){
            back.loop = false;
            back.pause();
            movementblocker = true;
            setTimeout(function(){ 
                evolution.play();
                startBattle();
            }, 1000);
            
            setTimeout(function(){
                
                evolution.pause();
            }, 4500);
        }
            
        }
       // output in debugger box
   }
   
   
   
   /***********************************
    * ANIMATE PLAYER
    * **********************************/
   function animatePlayer() {
       
       if (spriteImgNumber < 9) { // switch to next sprite position
           spriteImgNumber++;
           let x = parseFloat(spriteImg.style.right);
           x += 37.0; // ANPASSEN!
           spriteImg.style.right = x + "px";
       }
       else { // animation loop finished: back to start animation
           spriteImg.style.right = "0px";
           spriteImgNumber = 0;
       }
   
   }
   /***********************************
    * Colliding
    * **********************************/
   
   function isColliding(div1, div2, tolerance = 0) {
   
       let d1OffsetTop = div1.offsetTop;
       let d1OffsetLeft = div1.offsetLeft; 
       let d1Height = div1.clientHeight;
       let d1Width = div1.clientWidth;
       let d1Top = d1OffsetTop + d1Height;
       let d1Left = d1OffsetLeft + d1Width;
   
       let d2OffsetTop = div2.offsetTop;
       let d2OffsetLeft = div2.offsetLeft; 
       let d2Height = div2.clientHeight;
       let d2Width = div2.clientWidth;
       let d2Top = d2OffsetTop + d2Height;
       let d2Left = d2OffsetLeft + d2Width;
   
       let distanceTop = d2OffsetTop - d1Top;
       let distanceBottom = d1OffsetTop - d2Top;
       let distanceLeft = d2OffsetLeft - d1Left;
       let distanceRight = d1OffsetLeft - d2Left;
   
       return !(tolerance < distanceTop || tolerance < distanceBottom || tolerance < distanceLeft || tolerance < distanceRight);
   };
   
   let rndcounter = 0;


 
    




    function idset(id, string) {
        document.getElementById(id).innerHTML = string;
      }
      
      var stoppuhr = (function() {
        var stop = 1;
        var days = 0;
        var hrs = 0;
        var mins = 0;
        var secs = 0;
        var msecs = 0;
        return {
          start: function() {
            stop = 0;
          },
          stop: function() {
            stop = 1;
          },
          clear: function() {
            stoppuhr.stop();
            days = 0;
            hrs = 0;
            mins = 0;
            secs = 0;
            msecs = 0;
            stoppuhr.html();
          },
          restart: function() {
            stoppuhr.clear();
            stoppuhr.start();
          },
          timer: function() {
            if (stop === 0) {
              msecs++;
              if (msecs === 100) {
                secs ++;
                msecs = 0;
              }
              if (secs === 60) {
                mins++;
                secs = 0;
              }
              if (mins === 60) {
                hrs++;
                mins = 0;
              }
              if (hrs === 24) {
                days++;
                hrs = 0;
              }
              stoppuhr.html();
            }
          },
          
          set: function(tage, stunden, minuten, sekunden, msekunden) {
            stoppuhr.stop();
            days = tage;
            hrs = stunden;
            mins = minuten;
            secs = sekunden;
            msecs = msekunden;
            stoppuhr.html();
          },
          html: function() {
            idset("tage", days);
            idset("stunden", hrs);
            idset("minuten", mins);
            idset("sekunden", secs);
            idset("msekunden", msecs);
          }
        }
      })();
      setInterval(stoppuhr.timer, 10);
      
      placeCollectible();
      
  
      function placeCollectible() {
        collect.pause();
        collect.currentTime = 0;
       rndcounter = Math.floor(Math.random() * allpokemon.length);
           // calculate random position
           let maxX = gameContainer.clientWidth - collectible.clientWidth;
           let maxY = gameContainer.clientHeight - collectible.clientHeight;
   
           let randomX = Math.floor(Math.random() * maxX); 
           let randomY = Math.floor(Math.random() * maxY);
           while ( randomX > 970 || randomX < 0){
               randomX = Math.floor(Math.random() * maxX);
           }
           while ( randomY > 550 || randomY < 0){
               randomY = Math.floor(Math.random() * maxY);
           }
          
           // assign new position to collectible
           document.getElementById('collectible').style.marginLeft = randomX + 'px';
           document.getElementById('collectible').style.marginTop = randomY + 'px';
           if (document.getElementById('image') != undefined) {
           document.getElementById('collectible').innerHTML = `<img class="collectible" id="image" src="${allpokemon[rndcounter]}" alt="">`;
           rndcounter = Math.floor(Math.random() * allpokemon.length);
           document.getElementById(rivalcounter++).src = allpokemon[rndcounter];
           } else {
                document.getElementById('collectible').innerHTML = `<img class="collectible" id="image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" alt="">`;
           }
           
           // show the collectible
           collectible.style.display = 'block';
       }

     function loadNeededPokemon(number){
        fetch("https://pokeapi.co/api/v2/pokemon/"+ number)
        .then( (response) => { 
          return response.json();
        })
        .then( (pokemon) => {
          console.log(pokemon);
          cnfwf += 1;
          if (cnfwf == 1) {
            evoimg = pokemon.sprites.front_default;
          } else {
            rivalevoimg = pokemon.sprites.front_default;
          }
        }
        )
        .catch( (error) => {
          console.log('Error: ', error);
        })
     }
     function eeveeLoader(number){
        let path = ""
        if (eeveecounter <= 1) {
            fetch("https://pokeapi.co/api/v2/pokemon/"+ number)
        .then( (response) => { 
          return response.json();
        })
        .then( (pokemon) => {
          console.log(pokemon);
            path = pokemon.sprites.front_default;
        }
        )
        .then( (path) => {
            return path;
            }
        )
        .catch( (error) => {
          console.log('Error: ', error);
        })
        }
        eeveecounter++;
     }
     function startBattle(){
        document.getElementById('7').src = evoimg;
        document.getElementById('13').src = rivalevoimg;
        document.getElementById('game').style.display = "none";
        document.getElementById('aftergame').style.display = "block";     
        document.getElementById('battle').style.display = "block";     
        document.getElementById('battle').style.height = "500px";
        document.getElementById('battle').style.width = "1000px";
        document.getElementById('rivalpokemonbattle').src = rivalevoimg;
        document.getElementById('mypokemonbattle').src = evoimg;
        document.getElementById('mypokemonbattle').style.transform = "scaleX(-1)";
        document.getElementById('enemypokemon').style.marginLeft = "63%";
        document.getElementById('enemypokemon').style.marginTop = "9%";
        document.getElementById('mypokemon').style.marginLeft = "16%";
    }

    