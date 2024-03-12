let egg = new Audio('../audio/egg.mp3');
let lone = localStorage['easteregg'];
let ltwo = localStorage['credits'];
let lthree = localStorage['starwars'];
let watchedCredits = ltwo;
let eggachievemnt = lone;
let starwars = lthree;
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
document.getElementById('updown').innerHTML = `<img src="../gif/updown.gif" id="fallimgman" alt="">`;
setTimeout(() => {
    document.getElementById('fallimgman').style.display = "none";
}, 8000);
setTimeout(function(){
    document.getElementById('t').style.opacity = 1;
    watchedCredits = true;
    localStorage['credits'] = JSON.stringify(true);
    backToStart();
}, 10000);
}
function quitAll(){
    window.close();
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
    <img src="../img/achievement1.png" alt="" class="achievement-image" id="eastereggachievemnt">
    <p class="achievement">Find the Easter-Egg<br>
    <span class="game-title">Find Turtok which will lead you somewhere</span></p>
    </div><br>
    <div class="context">
    <img src="../img/logo1better.png" alt="" class="achievement-image" id="creditachievement">
    <p class="achievement">Watch the Credits<br>
    <span class="game-title">Watch the Credits to unlock</span></p>
    </div><br>
    <div class="context">
    <img src="../img/thechosenone.png" alt="" class="achievement-image" id="starwarsachievement">
    <p class="achievement">The Chosen One<br>
    <span class="game-title">Find the Chosen One</span></p>
    </div><br>`
    ;
    if (watchedCredits == true) {
        document.getElementById('creditachievement').style.filter = "grayscale(0%)";
        } 
    if (eggachievemnt == true) {
        document.getElementById('eastereggachievemnt').style.filter = "grayscale(0%)";
    }
    if (starwars == true) {
        document.getElementById('starwarsachievement').style.filter = "grayscale(0%)";
    }
}
}
function startVideo(){
window.location.href = "./game_from.html"
    gamefreak.play();
}
function backToStart(){
    document.getElementById('menucontent').style.display = "none";
    document.getElementById('btns').style.display = "block";
}
function openLeaderBoards(){
    window.location.href = "./game_leaderboard.html"
}

function openEgg(){
    if (document.getElementById('egg').style.display !== "none") {
        window.open('https://www.youtube.com/watch?v=djV11Xbc914&list=PLyHfA2xVdq50-6NkXVt2YO4Pf2ZOI9a_g&index=7');
        eggachievemnt = true;
        localStorage['easteregg'] = JSON.stringify(true);
        document.getElementById('egg').style.display = "none";
    }
}
setTimeout(() => {
    document.getElementById('egg').style.display = "block";
    egg.play();
    egg.loop = true;
    egg.volume = 0.25;
}, 244000);
let anakin = document.getElementById('anakin');
let chosenone = document.getElementById('thechosenone');
function revealTheChosenOne(){
    anakin.src = "../img/anakin.png";
    anakin.style.width = "40px";
    anakin.style.height = "auto";
    chosenone.style.marginTop = "37%";
    chosenone.style.marginLeft = "97%";
    setTimeout(() => {
   chosenone.style.display = "none";     
    }, 1000);
}
function sendThemToStarWars(){
    window.open('https://github.com/GregGeig/StarWarsCollect');
    starwars = true;
    localStorage['starwars'] = JSON.stringify(true);
}
function openOptions(){
    document.getElementById('menucontent').innerHTML = "";
    document.getElementById('btns').style.display = "none"
    document.getElementById('menucontent').style.display = "block";
    document.getElementById('menucontent').innerHTML = `
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
    sessionStorage['musicvolume'] = musicrange.value ;
}
function specialVolume(){
    let specialrange = 0;
    
        specialrange = document.getElementById('specialrange2');
    
    sessionStorage['specialvolume'] = specialrange.value;
}
function masterVolume(){
    let masterrange = 0;
    masterrange = document.getElementById('masterrange2');
    sessionStorage['mastervolume'] = masterrange.value;
}
function SetKeybinds(number){
    if (number == 1) {
        keybinds = 1;
    } else {
        keybinds = 2;
    }
    sessionStorage['keybinds'] = keybinds;
}