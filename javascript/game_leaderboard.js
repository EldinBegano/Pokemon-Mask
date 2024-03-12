let time = ""
function back(){
    window.location.href = "home.html";
}
function getScores(){
    let scores = JSON.parse(localStorage["finalscore"] ?? "[]");
    let second = scores;
    console.log(scores);
    let max = "";
    let temp;
    let placement = 0;
    let scoresSorted = [];
    for(let i = scores.length - 1; i > -1; i--){
        for(let j = i; j > -1; j--){
            if(scores[j][1].localeCompare(max) > 0){
                max = scores[j][1];
                placement = j;
            }
        }
        temp = scores[i];
        scores[i] = scores[placement];
        scores[placement] = temp;

        scoresSorted.push([second[i][0], max]);
        max = "";
        
    }
    console.log(scoresSorted);
    let counter = 1;
    for(let i = 0; i < 5; i++){
        time = scores[i][1];
        if(localStorage["name"] == second[i][0]){
            document.getElementById("names").innerHTML += `<p style="color: yellow;">${counter++}. ${second[i][0]} </p>`
            document.getElementById("scores").innerHTML += `<p style="color: yellow;">${time}</p>`
        } else{
            document.getElementById("names").innerHTML += "<p>"+  counter++ + ". " + second[i][0]; + "</p>"
            document.getElementById("scores").innerHTML += "<p>" + time; + "</p>"
        }

    }
}