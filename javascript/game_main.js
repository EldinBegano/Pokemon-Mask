let star = new Audio("../audio/audio1.mp3");
let rivalcounter = 14;
let evolution = new Audio("../audio/evo.mp3");
let counter = 2;
let gender = sessionStorage['gender'];
let firsttime = true;
let battlecounter = 8;
let movementblocker = false;
let cnfwf = 0;
let keybinds = sessionStorage['keybinds'];
let evoimg = "";
let rivalevoimg = "";
let pokenumber = 0;
let pokerivalnumber = 0;
let collect = new Audio("../audio/collect.mp3");
let back = new Audio("../audio/backgroundmusic.mp3");
let final = new Audio("../audio/final.mp3");
let end = new Audio("../audio/end.mp3");
let allpokemon = [];
allpokemon.push("../img/star_wars.png")
let randoms = []
let randomsrival = []
let beatit = false;
let username = sessionStorage['name'];
localStorage['name'] = JSON.stringify(username);
localStorage['gender'] = JSON.stringify(gender);
let musicvolume = sessionStorage['musicvolume'];
let specialvolume = sessionStorage['specialvolume'];
let mastervolume = sessionStorage['mastervolume'];
function startPage(){
    document.getElementById('afterbeforegame').style.display = "block";
}
startPage()
 
   /***********************************
    * GAME CONFIG
    * **********************************/
   let spriteImgNumber = 0; // current animation part of sprite image
   let gameSpeed = 24; // game loop refresh rate (pictures per second)
   let characterSpeed = 5; // move offset in PX
   
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
    document.getElementById('clockdiv').style.display = "block";
    document.getElementById('afterbeforegame').style.display = "none";
    document.getElementById('game').style.display = "block";
    document.getElementById('surface').style.height = "600px";
    document.getElementById('surface').style.width = "1000px";
     back.play();
     back.loop = true;
    document.getElementById('1').src = "../img/" + starterpokemon + ".png";
    document.getElementById('7').src = "../img/" + starterpokemon + ".png";
    document.getElementById('13').src = "../img/" + rivalstarterpokemon + ".png";
    startGame()
}
}

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

function startGame() {
    if (gender == "Boy") {
    document.getElementById('spriteImg').src = "../img/sprites2.png";
    } else {
    document.getElementById('spriteImg').src = "../img/spritesg_1.png";
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

const gameContainer = document.getElementById('surface');
let collectible = document.getElementById('collectible');
let collectibleCounter = 0;

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
         collect.pause();
         movementblocker = true;
         setTimeout(function(){
            evolution.play();
         }, 100)
         setTimeout(function(){ 
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
var stop = 1;
    var days = 0;
    var hrs = 0;
    var mins = 0;
    var secs = 0;
    var msecs = 0;
function idset(id, string) {
    document.getElementById(id).innerHTML = string;
  }
  
  var stoppuhr = (function() {
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
  let countrandom = 0
  let countrandom2 = 0
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
        randoms.push(allpokemon[rndcounter])
        if (rndcounter == 0){
            surface.style.backgroundImage = "url('../img/img1.jpg')";
            document.getElementById('backgroundi').backgroundImage = "url('../img/space.jpg')";
            document.getElementById('backgroundi').style.backgroundSize = "cover";
            star.pause();
            star.play();
            back.pause();
        } else {
            document.getElementById('collectible').innerHTML = `<img class="collectible" id="image" src="${randoms[countrandom++]}" alt="">`;
        }
       rndcounter = Math.floor(Math.random() * allpokemon.length);
       randomsrival.push(allpokemon[rndcounter])
       document.getElementById(rivalcounter++).src = randomsrival[countrandom2++];
       rndcounter = Math.floor(Math.random() * allpokemon.length);
       } else {
            
            if (firsttime == false) {
                document.getElementById('collectible').innerHTML = `<img class="collectible" id="image" src="${randoms[countrandom++]}" alt="">`;
            } else{
                document.getElementById('collectible').innerHTML = `<img class="collectible" id="image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" alt="">`;
            firsttime = false;
            }
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


function quitAll(){
    window.close();
}
let leaderboardcounter = 0;
function openLeaderBoards(){
if (leaderboardcounter == 0){
    document.getElementById('warning').innerHTML = '<p>Progress won`t be saved.</p>'
    leaderboardcounter++;
} else {
    window.location.href = "./game_leaderboard.html"
}
}
function openLeaderBoards2(){
    window.location.href = "./game_leaderboard.html"
}
function openOptions(){
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

function musicVolume(){
    let musicrange = 0;
    
     musicrange = document.getElementById('musicrange2');
    
    console.log(musicrange.value/100);
    back.volume = musicrange.value /100;
    final.volume = musicrange.value /100;
    end.volume = musicrange.value /100;
}
function specialVolume(){
    let specialrange = 0;
    
        specialrange = document.getElementById('specialrange2');
    
    collect.volume = specialrange.value / 100;
    evolution.volume = specialrange.value / 100;
}
function masterVolume(){
    let masterrange = 0;
    masterrange = document.getElementById('masterrange2');
    back.volume = masterrange.value / 100;
    collect.volume = masterrange.value / 100;
    evolution.volume = masterrange.value / 100;
    final.volume = masterrange.value / 100;
    end.volume = masterrange.value / 100;
}

function quitTheGame(){
    window.location.href = "./home.html"
}
function backToStart(){

    document.getElementById('menucontent2').style.display = "none";
    document.getElementById('escape-Box').style.display = "block";

}

function SetKeybinds(number){
    if (number == 1) {
        keybinds = 1;
    } else {
        keybinds = 2;
    }
}

 function startBattle(){
    star.pause();
    setTimeout(function(){
        evolution.pause();
        final.play();
        final.loop = true; 
    }, 3500);   
    randoms.unshift("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png")
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
    document.getElementById('dice').style.marginTop = "12%";
    document.getElementById('dice2').style.marginTop = "12%";
}
let dice = Math.floor(Math.random * 6);
let dice2 = Math.floor(Math.random * 6);
let diceimg = ["../img/one.png", "../img/two.png", "../img/three.png", "../img/four.png", "../img/five.png", "../img/six.png"];


    let attackwon = 0
    let rivalattackwon = 0
    let last = "";
    let revived = false;
    let timer = "";
function attack(){
    dice = Math.floor(Math.random() * 6);
    dice2 = Math.floor(Math.random() * 6);
    document.getElementById('dice').innerHTML = `<img class="${dice}" src="${diceimg[dice]}">`;
    document.getElementById('dice2').innerHTML = `<img class="${dice}" src="${diceimg[dice2]}">`;
    if (dice > dice2) {
        document.getElementById('result').innerHTML = "You won!";
        document.getElementById('rivalpokemonbattle').src = randomsrival[randomsrival.length - attackwon -1];
        attackwon++;
    } else if (dice == dice2) {
        document.getElementById('result').innerHTML = "Draw!";
    } else {
        document.getElementById('result').innerHTML = "You lost!";
        last = randoms[randoms.length - rivalattackwon];
        document.getElementById('mypokemonbattle').src = randoms[randoms.length - rivalattackwon -1];
        rivalattackwon++;
        revived = false;
    }
    if (attackwon == randoms.length-1 || attackwon == randomsrival.length-1) {
        final.pause();
        final.loop = false;
        document.getElementById('battle').style.display = "none";
        document.getElementById('aftergame').style.display = "none";
        document.getElementById('winnerbox').style.display = "block";
        document.getElementById('winner').innerHTML = "<h1>You won!</h1>";
        document.getElementById('winner').style.color = "green";
        document.getElementById('winner').style.textShadow = "2px 2px 2px black";
        document.getElementById('winner').style.textAlign = "center";
        end.play();
        end.loop = true;
        beatit = true;
        stoppuhr.stop();
        timer = hrs + ":" + mins + ":" + secs + ":" + msecs;
        localStorage['time'] = JSON.stringify(timer);
        let finalscore = [sessionStorage['name'], timer];
        let score = JSON.parse(localStorage["finalscore"] ?? "[]");
        score.push(finalscore);
        localStorage["finalscore"] = JSON.stringify(score)  
    } else if (rivalattackwon == randomsrival.length-1 || rivalattackwon == randoms.length-1){
        final.pause();
        final.loop = false;
        document.getElementById('battle').style.display = "none";
        document.getElementById('aftergame').style.display = "none";
        document.getElementById('winnerbox').style.display = "block";
        document.getElementById('winner').innerHTML = "<h1>You lost!</h1>";
        document.getElementById('winner').style.color = "red";
        document.getElementById('winner').style.textShadow = "2px 2px 2px black";
        document.getElementById('winner').style.textAlign = "center";
        end.play();
        end.loop = true;
        stoppuhr.stop();
        timer = hrs + ":" + mins + ":" + secs + ":" + msecs;
        localStorage['time'] = JSON.stringify(timer);
        let finalscore = [sessionStorage['name'], timer];
        let score = JSON.parse(localStorage["finalscore"] ?? "[]");
        score.push(finalscore);
        localStorage["finalscore"] = JSON.stringify(score)  
    }
}
function defend(){
    dice = dice2;
    dice2 = dice;
    document.getElementById('dice').innerHTML = `<img class="${dice}" src="${diceimg[dice]}">`;
    document.getElementById('dice2').innerHTML = `<img class="${dice}" src="${diceimg[dice2]}">`;
    if (dice === dice2){
        document.getElementById('result').innerHTML = "Blocked!";
    }
}
let hiddenattack = 1;
function items(){
    resumeBox.style.display = 'flex';
    resumeBox.innerHTML = 
    `<h1 onclick="goBack()">Items</h1>
    <br>
    <div class="item"><img class="useitems" src="../img/shield.png"><button class="item-btns" onclick="itemOne()">Hidden Attack</button></div>`
    if (rivalattackwon > 1 && revived == false) {
        resumeBox.innerHTML += 
        `<br>
        <div class="item"><img class="useitems" src="../img/beleber.png"><button class="item-btns" onclick="itemTwo()">Top Beleber</button></div>`
        revived = true;
    }
    resumeBox.innerHTML += 
    `<br>
    <div class="item"><img class="useitems" src="../img/berry.png"><button class="item-btns" onclick="itemThree()">Tamato Berry</button></div>
    <br>
    <div class="item"><img class="useitems" src="../img/potion.png"><button class="item-btns" onclick="itemThree()">Potion</button></div>
    <br>
    <div class="item"><img class="useitems" src="../img/aufwecker.png"><button class="item-btns" onclick="itemThree()">Awakening</button></div>
    <br>
    <div class="item"><img class="useitems" src="../img/vitalkraut.png"><button class="item-btns" onclick="itemThree()">Revival Herb</button></div>^
    <br>
    <div class="item"><p id="itemtext"></p></div>`
}
function goBack(){
    resumeBox.style.display = 'none';
}
function run(){
    
    document.getElementById('result').innerHTML = "You can´t run from trainer battles";
}
function itemOne(){
    if (hiddenattack == 1){
        resumeBox.style.display = 'none';
    document.getElementById('result').innerHTML = "You used Hidden Attack!";
    document.getElementById('rivalpokemonbattle').src = randomsrival[randomsrival.length - attackwon -1];
    attackwon++;
    hiddenattack--;
    } else{
        resumeBox.style.display = 'none';
        document.getElementById('result').innerHTML = "You can't use it anymore!";
    }
    
}
function itemTwo(){
    resumeBox.style.display = 'none';
    document.getElementById('result').innerHTML = "You used Top Beleber!";
    rivalattackwon--; 
    document.getElementById('mypokemonbattle').src = last;
}
function itemThree(){
    document.getElementById('itemtext').innerHTML = "You can´t use this item right now!";
}