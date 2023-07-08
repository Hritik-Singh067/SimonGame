buttonColours = ["red", "blue", "green", "yellow"];

var userClcikedPattern = [];
var gamePattern = [];

var level = 0;

var started = false;

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $("h1").text("Level " + level);

    userClcikedPattern = [];
}

$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClcikedPattern.push(userChosenColour);

    console.log(userClcikedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClcikedPattern.length - 1);
});


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClcikedPattern[currentLevel] == gamePattern[currentLevel]) {
        if ((gamePattern.length - 1) == currentLevel) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else if (started) {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    $("h1").text("Press A Key to Start");
}