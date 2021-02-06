var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Flash animation
  $("div#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  //Play sound
  playSound(randomChosenColour);
  //Increase the level
  level++;
  //Change the title according to level
  $("h1#level-title").text("Level " + level);
}

$("div.btn").on("click", function (e) {
  var userChosenColur = e.target.id;
  userClickedPattern.push(userChosenColur);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColur));
  //Play sound
  playSound(userChosenColur);
  //Animation on button click
  animatePress(userChosenColur);
});

//Play specified sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animation for button click
function animatePress(currentColour) {
  $("div#" + currentColour)
    .addClass("pressed")
    .delay(100)
    .queue(function () {
      $("div#" + currentColour)
        .removeClass("pressed")
        .dequeue();
    });
}

$("h1#level-title").on("click", function () {
  if (level === 0) {
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (level === currentLevel + 1) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body")
      .addClass("game-over")
      .delay(200)
      .queue(function () {
        $("body").removeClass("game-over").dequeue();
      });
    $("h1#level-title").text("Game Over, Press Here to Restart");
    $("h2.score-title").removeClass("hide").text("Your Score:" + level);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
