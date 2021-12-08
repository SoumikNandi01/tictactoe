var started = false;
var cross_turn = true;
var circle_turn = false;
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var audio = new Audio("blue.mp3");

$("#start").click(function() {
  if (!started) {
    started = true;
    var elements = document.getElementsByClassName("btn");
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML = ''
    }
    $("#title").text("Player X turn");
  }
});

$(".btn").click(function() {
  var chosenBox = $(this).attr("id");
  if (!started) {
    $("#title").text("Please start the game by pressing any key");
    return;
  }
  validate(chosenBox)
});

function validate(chosenBox) {
  var chosenBoxPosition = chosenBox.charAt(3);
  if (cross_turn && validatePosition(chosenBoxPosition)) {
    board[chosenBoxPosition] = -1;
    document.getElementById(chosenBox).innerHTML = `<h2 class = "cell-text-cross">X</h2>`
    var gameEnds = gameEnd();
    console.log(gameEnds);
    if (gameEnds == -1) {
      $("#title").text("Player X won! Restart By Pressing Any Key");
      reset();
      return;
    }
    if (gameEnds == 1) {
      console.log("ends");
      $("#title").text("Player O won! Restart By Pressing Any Key");
      reset();
      return;
    }

    if (gameEnds == -2) {
      $("#title").text("Match Tied! Restart By Pressing Any Key");
      reset();
      return;
    }

    cross_turn = !cross_turn
    circle_turn = !circle_turn
    $("#title").text("Player O turn");
  } else if (circle_turn && validatePosition(chosenBoxPosition)) {
    board[chosenBoxPosition] = 1;
    document.getElementById(chosenBox).innerHTML = `<h2 class = "cell-text-circle">O</h2>`
    var gameEnds = gameEnd();
    console.log(gameEnds);
    if (gameEnds == -1) {
      $("#title").text("Player X won! Restart By Pressing Any Key");
      reset();
      return;
    }
    if (gameEnds == 1) {
      $("#title").text("Player O won! Restart By Pressing Any Key");
      reset();
      return;
    }
    if (gameEnds == -2) {
      $("#title").text("Match Tied! Restart By Pressing Any Key");
      reset();
      return;
    }
    cross_turn = !cross_turn
    circle_turn = !circle_turn
    $("#title").text("Player X turn");
  } else {
    $("#title").text("Cell already occupied! Please enter in a different cell")
  }
}

function validatePosition(chosenBoxPosition) {
  if (board[chosenBoxPosition] == 0) {
    audio.play();
    return true;
  }
  return false;
}

function gameEnd() {
  if (board[0] == board[1] && board[1] == board[2]) {
    return board[0];
  } else if (board[3] == board[4] && board[4] == board[5]) {
    return board[3];
  } else if (board[6] == board[7] && board[7] == board[8]) {
    return board[6];
  } else if (board[0] == board[3] && board[3] == board[6]) {
    return board[0];
  } else if (board[1] == board[4] && board[4] == board[7]) {
    return board[1];
  } else if (board[2] == board[5] && board[5] == board[8]) {
    return board[2];
  } else if (board[0] == board[4] && board[4] == board[8]) {
    return board[0];
  } else if (board[2] == board[4] && board[4] == board[6]) {
    return board[2];
  } else if (board[0] != 0 && board[1] != 0 && board[2] != 0 && board[3] != 0 && board[4] != 0 && board[5] != 0 && board[6] != 0 && board[7] != 0 && board[8] != 0) {
    return -2;
  } else {
    return 0;
  }
}

function reset() {
  started = false;
  cross_turn = true;
  circle_turn = false;
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}
