console.log(`*****************`)

//Globals ************************
var userScore = 0;
var comScore = 0;
var turn = 0;
var totalRound = 5;
var userArr = [];
var heartIndex = 0;
var monsterURL = ["https://img.pokemondb.net/artwork/ivysaur.jpg", "https://img.pokemondb.net/artwork/ponyta.jpg","https://img.pokemondb.net/artwork/vaporeon.jpg","https://img.pokemondb.net/artwork/marowak.jpg","https://img.pokemondb.net/artwork/golem.jpg"]
var monsterList = ["Ivysaur", "Ponyta", "Vaporeon", "Marowak","Golem"];
var monsterType = ["grass", "fire", "water", "ground", "rock"];
var typeURL = ["assets/typegrass.png","assets/typefire.png","assets/typewater.png","assets/typeground.png","assets/typerock.png"];
var enemyHealth = document.getElementById("enemyHealth");
var attack_id = document.getElementById("attack");
var userScore_id = document.getElementById("user-score");
var comScore_id = document.getElementById("com-score");
var result_id = document.getElementById("result");
var monster_id = document.getElementById("monster");
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
    document.getElementById("enemy").setAttribute("src", monsterURL[monsterIndex]);
    document.getElementById("type").setAttribute("src", typeURL[monsterIndex]);
}



//Game outcome****************************
var userWin = function (){
    result_id.textContent = "You beat the monster!"}

var comWin = function (){
    result_id.textContent = "Uh oh..the monster has won!"}

var gameDraw = function (){
    result_id.textContent = "It's a draw!"}

var checkWin = function(){
    if (turn < totalRound){
        monster() //%%%%%%% To set delay
    } else if (turn === totalRound && userScore>comScore){
        userWin();
    } else if (turn === totalRound && comScore>userScore){
        comWin();
    } else if (turn === totalRound && comScore===userScore){
        gameDraw();
    }
}


//Game logic****************************
var play = function (x){


    turn++;


    var userInput = event.target.id;
    console.log ('Start of Round '+turn);

    console.log("User chose "+x);

if (x === currentMonster){
    user_id.textContent = "No effect! Same type!";

}else {

    switch (x + currentMonster){
        case "waterfire":
        case "waterground":
        case "waterrock":
        case "firegrass":
        case "groundrock":
        case "groundfire":
        case "rockfire":
        case "grassrock":
        case "grassground":
        case "grasswater":

            enemyHealth.value -=10;
            setTimeout(function(){ enemyHealth.value =10; }, 500);
            userScore++;
            userScore_id.textContent++;
        break
        case "firewater":
        case "groundwater":
        case "rockwater":
        case "grassfire":
        case "rockground":
        case "fireground":
        case "firerock":
        case "rockgrass":
        case "groundgrass":
        case "watergrass":

            comScore++;
            comScore_id.textContent++;
        break

        }
    }


    console.log ('End of Round '+turn);
    checkWin();

}


//Send user end input: Attack button***********************
var sendAttack = function(userInput){

    var userInput = event.target.id;
    userArr.push(userInput);
    user_id.textContent="You use "+userArr;

    console.log(`sendAttack is: `+userArr);
    attack_id.addEventListener("click", function(){checkCombo(userArr)})

}


//Check combo****************************
var combo1 = function(){
    var fullHeart = document.querySelector(".full")
    fullHeart.classList.add('is-empty');
    fullHeart.classList.remove('full');
    var combo = userArr[0];
    play(combo);
}


//%%%%%%%%%% To code combo2
var combo2 = function(){
    var fullHeart = document.querySelectorAll(".full")
    for (var i=0; i<2; i++){
        fullHeart[i].classList.add('is-empty');
    };
    for (var j=0; j<2; j++){
        fullHeart[j].classList.remove('full');
    };
    console.log(userArr);
    var combo = userArr[0]+userArr[1];
    console.log(combo);
    play(combo);
}


//%%%%%%%%%% To code combo3
var combo3 = function(){
    var fullHeart = document.querySelectorAll(".full")
    for (var i=0; i<3; i++){
        fullHeart[i].classList.add('is-empty');
    };
    for (var j=0; j<3; j++){
        fullHeart[j].classList.remove('full');
    };
    console.log(userArr);
    var combo = userArr[0]+userArr[1]+userArr[2];
    console.log(combo);
    play(combo);
}


var checkCombo = function (userInput){


    user_id.textContent="";
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

    setTimeout(function(){monster(); }, 500);


}

setUp();