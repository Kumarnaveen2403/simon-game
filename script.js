var gameLevel = 1;
var buttonStack = [];
var userClickStack = [];
var gameHasStarted = false;

$(document).keypress( function(){
    randomButton();
});

$(".btn").click( function(event) {
    var buttonPressed = event.target.id;
    userClickStack.push(buttonPressed);

    //User Clicked Button Animation
    var audio = new Audio("sounds/" + buttonPressed + ".mp3");
    audio.play();
    $(event.target).addClass("pressed");
    setTimeout( function() {
        $(event.target).removeClass("pressed");
    }, 100);

    //Checking the user clicked value
    
    var checkVar = true;

    for(var i = 0; i<userClickStack.length; i++) {
        if(userClickStack[i] != buttonStack[i]){

            //GameOver
            buttonStack = [];
            userClickStack = [];
            $("h1").text("Game Over Press Any Key to Restart");
            gameLevel = 1;
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $(document.body).addClass("game-over");
            setTimeout( function() {
                $(document.body).removeClass("game-over");
            }, 100);
            checkVar= false;
            gameHasStarted= false;
            $(document).keypress( function(){
                randomButton();
            });
            
            break;
        }

    }

    if(checkVar && buttonStack.length == userClickStack.length){
        setTimeout( randomButton , 900);
        gameLevel++;
    }
    
});

function randomButton() {
    $(document).off('keypress');

    gameHasStarted = true;
    var randomNumber = Math.floor( Math.random() * 4);
    var random = document.querySelectorAll(".btn")[randomNumber];

    $("h1").text("Level " + gameLevel);

    buttonStack.push(random.id);
    userClickStack = [];

    //Generated Button Animation
    $(random).addClass("pressed-game");
    var audio = new Audio("sounds/" + random.id + ".mp3");
    audio.play();
    setTimeout( function() {
        $(random).removeClass("pressed-game");
    }, 100);
}