let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = []
let userPattern = []

let level = 1;
let isGame = false;

let userChosenColor = "";

function createNextBlink() {
    userPattern = [];
    level = level + 1;

    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomColor);
}

function playAudio(audioName) {
    let audio = new Audio("sounds/" + audioName + ".mp3");
    audio.play();
}

function animatePress(activeButton) {
    $("#" + activeButton).addClass("pressed");
    setTimeout( function () {
        $("#" + activeButton).removeClass("pressed");
    }, 100);
}

function startOver() {
    gamePattern = [];
    level = 0;
    isGame = false;
}

$(document).keydown(function () {
    if (isGame === false) {
        level = 1;
        $("h1").text("Level " + level);
        setTimeout(function () {
            createNextBlink();
        }, 1000);
        isGame = true;
    }
});


$(".btn").click(function () {
    userChosenColor= this.id;
    animatePress(userChosenColor);
    playAudio(userChosenColor);
    userPattern.push(userChosenColor);
    checkAnswer(userPattern.length - 1);
    console.log(gamePattern);
    console.log(userPattern);
});

function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] === userPattern[currentIndex]) {
        if (gamePattern.length === userPattern.length) {
            $("h1").text("Level " + level);
            setTimeout(function () {
            createNextBlink();
            }, 1000)
        }
    }
    else {
        $("body").addClass("game-over");
        playAudio("wrong");
        setTimeout( function () {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").html("Game Over, <br>Press Any Key to Restart");
        startOver();
    }
}