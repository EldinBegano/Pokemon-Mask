let username =JSON.parse(localStorage['name']);
let timer = JSON.parse(timer);
let counter = 1;
    document.getElementById('singlecontent').innerHTML += 
    `<br><div class="ranked"><div class="Rank">${counter}.</div><div class="Name">${username}</div><div class="Time">${timer}</div></div>`;

function back(){
    window.location.href = "home.html";
}
