console.log(`*****************`)

//Globals ************************
var userScore = 0;
var comScore = 0;
var turn = 0;
var totalRound = 5;
var userArr = [];
var monsterURL = ["https://img.pokemondb.net/artwork/ivysaur.jpg", "https://img.pokemondb.net/artwork/ponyta.jpg","https://img.pokemondb.net/artwork/vaporeon.jpg","https://img.pokemondb.net/artwork/marowak.jpg","https://img.pokemondb.net/artwork/aerodactyl.jpg"]
var monsterList = ["Ivysaur", "Ponyta", "Vaporeon", "Marowak","Aerodactyl"];
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
    currentMonster=monsterList[monsterIndex];

    console.log("The enemy is: "+currentMonster)
    document.querySelector("img").setAttribute("src", monsterURL[monsterIndex]);

}


//Game outcome****************************
var userWin = function (){
    result_id.textContent = "You beat the monster!"}

var comWin = function (){
    result_id.textContent = "Uh oh..the monster has won!"}

var gameDraw = function (){
    result_id.textContent = "Check code! Game cannot be draw"}

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
    //console.log(x);
    user_id.textContent="You use "+x;
    console.log("User chose "+x);


    switch (x + currentMonster){
        case "metalwood":
        case "woodearth":
        case "waterfire":
        case "firemetal":
        case "earthwater":
        //generating flow
        case "metalwater":
        case "woodfire":
        case "waterwood":
        case "fireearth":
        case "earthmetal":

            userScore++;
            userScore_id.textContent++;
        break
        case "woodmetal":
        case "earthwood":
        case "firewater":
        case "metalfire":
        case "waterearth":
        //generating flow
        case "watermetal":
        case "firewood":
        case "woodwater":
        case "earthfire":
        case "metalearth":

            comScore++;
            comScore_id.textContent++;
        break
        case "woodwood":
        case "earthearth":
        case "firefire":
        case "metalmetal":
        case "waterwater":
            console.log("NO EFFECT")
        break
        default:
    console.log("ERROR~~~");

    }

    console.log ('End of Round '+turn);
    checkWin();

}


//Send user end input: Attack button***********************
var sendAttack = function(userInput){


    var userInput = event.target.id;

    //console.log(userArr)
    userArr.push(userInput);
    //console.log(userArr);

    console.log(`sendAttack is: `+userInput);
    attack_id.addEventListener("click", function(){checkCombo(userInput)})

}


//Check combo****************************
var combo1 = function(){
    //console.log(userArr)
    var combo = userArr[0];
    //console.log(combo);
    play(combo);
}


//%%%%%%%%%% To code combo2
var combo2 = function(){
    console.log(userArr)
    var combo = userArr[0]+userArr[1];
    console.log(combo);
    sendAttack(combo);
}


//%%%%%%%%%% To code combo3
// var combo3 = function(){


// }


var checkCombo = function (userInput){

    //console.log(userArr);

    switch(userArr.length){
    case 1:
        combo1();
    break
    case 2:
        combo2();
    break
    case 3:
        console.log("combo3");
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

    monster();

}

setUp();