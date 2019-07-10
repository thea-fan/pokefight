console.log(`*****************`)

//Globals ************************
var userScore = 0;
var comScore = 0;
var turn = 0;
var totalRound = 10;
var userArr = [];
var heartIndex = 0;
var stopTime;
var timer= document.querySelector('#timer');
var monsterURL = ["assets/ivysaur.png", "assets/ponyta.png","assets/vaporeon.png","assets/cubone.png","assets/golem.png"]
var monsterList = ["Ivysaur", "Ponyta", "Vaporeon", "Cubone","Golem"];
var monsterType = ["grass", "fire", "water", "ground", "rock"];
var typeURL = ["assets/typegrass.png","assets/typefire.png","assets/typewater.png","assets/typeground.png","assets/typerock.png"];
var enemyHealth = document.getElementById("enemyHealth");
var userHealth = document.getElementById("userHealth");
var attack_id = document.getElementById("attack");
var playerWin_id = document.getElementById("playerWin");
var enemyWin_id = document.getElementById("enemyWin");
var userScore_id = document.getElementById("user-score");
var comScore_id = document.getElementById("com-score");
var result_id = document.getElementById("result");
var enemy_id = document.getElementById("enemy");
var user_id = document.getElementById("user");
var fire_id = document.getElementById("fire");
var water_id = document.getElementById("water");
var ground_id = document.getElementById("ground");
var grass_id = document.getElementById("grass");
var rock_id = document.getElementById("rock");



//Create random monster*******************
var monster= function(){

    var monsterIndex = Math.floor(Math.random()*monsterList.length);

    result_id.textContent = "It is a "+monsterList[monsterIndex]+"!";
    currentMonster = monsterType[monsterIndex];

    console.log("The enemy is: "+currentMonster);
    enemy_id.setAttribute("src", monsterURL[monsterIndex]);
    document.getElementById("type").setAttribute("src", typeURL[monsterIndex]);
    setTimeout(function(){ enemy_id.classList.remove('explode');}, 300);
    setTimeout(function(){ playerWin_id.classList.add('toHide');}, 400);
}

//Animation*******************
function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}




//Game outcome****************************
var userWin = function (){
    result_id.textContent = "You beat the enemy!"}

var comWin = function (){
    result_id.textContent = "Uh oh..you have lost!"}

var gameDraw = function (){
    result_id.textContent = "It's a draw!"}

var checkWin = function(){
    if (turn < totalRound){
        if (enemyHealth.value <= 0){
        enemy_id.classList.add('explode');
        userScore++;
        userScore_id.textContent++;
        playerWin_id.classList.remove('toHide');
        setTimeout(function(){ enemyHealth.value =10; }, 500);

        } else if (userHealth.value <= 0){
            comScore++;
            comScore_id.textContent++;
            enemyWin_id.classList.remove('toHide');
            setTimeout(function(){ enemyWin_id.classList.add('toHide');}, 400);
            var fullHeart = document.querySelector(".full")
            fullHeart.classList.add('is-empty');
            fullHeart.classList.remove('full');
            setTimeout(function(){ userHealth.value =10; }, 500);}
            monster();

    } else if (turn === totalRound && userScore>comScore){
        userWin();
    } else if (turn === totalRound && comScore>userScore){
        comWin();
    } else if (turn === totalRound && comScore===userScore){
        gameDraw();
    }
}



//Damage extent***************************
var totalKillEnemy = function (){
    animateCSS('#enemyHealth', 'heartBeat');
    enemyHealth.value -=10;
}

var halfKillEnemy = function (){
    animateCSS('#enemy', 'jello');
    animateCSS('#enemyHealth', 'heartBeat');
    enemyHealth.value -=5;
}

var quarterKillEnemy = function (){
    animateCSS('#enemyHealth', 'heartBeat');
    animateCSS('#enemy', 'jello');
    enemyHealth.value -=2.5;
}

var totalKillPlayer = function (){
    animateCSS('.display', 'shake');
    animateCSS('#userHealth', 'heartBeat');
    userHealth.value -=10;
}

var halfKillPlayer = function (){
    animateCSS('#userHealth', 'heartBeat');
    userHealth.value -=5;
}

var quarterKillPlayer = function (){
    animateCSS('#userHealth', 'heartBeat');
    userHealth.value -=2.5;
}




//Game logic****************************
var play = function (userInput){

    turn++;

    console.log("User chose "+userInput);
        user_id.textContent="";

if (userInput === currentMonster){
    user_id.textContent = "No effect! Same type!";

}else {

    switch (userInput + currentMonster){
    //Win scenarios
        case "waterfire":
        case "firegrass":
        case "grasswater":
        case "groundrock":
        totalKillEnemy();
        break

        case "waterrock":
        case "groundfire":
        case "grassground":
        halfKillEnemy();
        break

        case "rockfire":
        case "grassrock":
        case "waterground":
        quarterKillEnemy();
        break

    //Lose scenarios
        case "firewater":
        case "grassfire":
        case "watergrass":
        case "rockground":
        totalKillPlayer();
        break

        case "rockwater":
        case "fireground":
        case "groundgrass":
        halfKillPlayer();
        break

        case "groundwater":
        case "rockgrass":
        case "firerock":
        quarterKillPlayer();
        break

        } checkWin();
    }


}


//Send user end input: Attack button***********************
var sendAttack = function(userInput){


    var userInput = event.target.id;
    userArr.push(userInput);
    var selected = event.target;
    selected.classList.add("selected");

    user_id.textContent="You use "+userArr;

    console.log(`sendAttack is: `+userArr);
    attack_id.addEventListener("click", function(){checkCombo(userArr)})


}


//Check combo****************************
var combo1 = function(){
    var combo = userArr[0];
    play(combo);
}


//Combo2
var combo2 = function(){
    console.log(userArr);
    var combo = userArr[0]+userArr[1];
    console.log(combo);
    play(combo);
}


//Combo3
var combo3 = function(){
    console.log(userArr);
    var combo = userArr[0]+userArr[1]+userArr[2];
    console.log(combo);
    play(combo);
}


var checkCombo = function (userInput){

    animateCSS('#attack', 'shake');
    var selectedPowers = document.querySelectorAll(".selected");
    for (var i = 0; i < selectedPowers.length; i++) {
    selectedPowers[i].classList.remove("selected")}

    switch(userArr.length){
    case 1:
        combo1();
    break
    case 2:
        combo2();
    break
    case 3:
        combo3();
    break

}
        userArr=[];

}

var alertInput = function (){

    if (userArr.length===0) {
        alert("pls choose a power");
  }
}


//Start game****************************

var setUp = function(){
    fire_id.addEventListener("click", sendAttack);
    water_id.addEventListener("click", sendAttack);
    ground_id.addEventListener("click", sendAttack);
    grass_id.addEventListener("click", sendAttack);
    rock_id.addEventListener("click", sendAttack);
    attack_id.addEventListener("click", alertInput);
    playerWin.classList.add('toHide');
    enemyWin.classList.add('toHide');

    setTimeout(function(){monster(); }, 500);
}

setUp();

//Lose Game****************************
var alertLoseGame = function (){
    document.querySelector('body').style.backgroundBlendMode="difference";
    document.querySelector('body').style.color="white";
    document.querySelector('#timer').style.border="5px solid red";
}



//Timer****************************
function startTimer(duration, display) {
    var time = duration, seconds;
    setInterval(function () {
        seconds = parseInt(time % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timer.textContent = "Time: 0:" + seconds;

        //Warning: last 10 sec
        if (seconds === 10){
        alertLoseGame();
        }

        //No more time
        if (--time < 0) {
            timer.textContent = "Time ran out!";
        }

    }, 1000);

}

window.onload = function () {
    var thirtySec = 60 / 2;
    startTimer(thirtySec, timer);
};