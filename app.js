$(document).ready(function() {
  // [VARIABLES]
  var count = 0;
  var userCount = 0;
  var historyArray = [];
  var userInput = [];
  var strict = false;

  // [SOUNDS]
  var redSound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  );
  var blueSound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  );
  var yellowSound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  );
  var greenSound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  );
  var error = new Audio(
    "https://www.dropbox.com/s/n3jezc5cnht4qig/366103__original-sound__error-wooden.wav?raw=1"
  );

  // [FUNCTIONS]
  function disableColors(state) {
    if (state) {
      $("#red, #blue, #yellow, #green").prop("disabled", true);
    } else {
      $("#red, #blue, #yellow, #green").prop("disabled", false);
    }
  }

  //generate a sequence of random presses (pushes one INT(1-4) to historyArray);
  function randomPattern(num, arr) {
    for (x = 0; x < num; x++) {
      arr.push(Math.floor(Math.random() * 4 + 1));
    }
  }

  //trigger button color
  function triggerColor(id, color, newColor, sound) {
    $(id).css("background-color", newColor);
    sound.play();
    window.setTimeout(function() {
      $(id).css("background-color", color);
    }, 500);
  }

  //convert numbers to function calls
  function convertNumbers(arr) {
    $(".btn-default").prop("disabled", true);
    function theLoop(i) {
      setTimeout(function() {
        if (arr[i] === 1) {
          triggerColor("#red", "#CB6D51", "red", redSound);
        } else if (arr[i] === 2) {
          triggerColor("#blue", "#5F9EA0", "blue", blueSound);
        } else if (arr[i] === 3) {
          triggerColor("#yellow", "#DDE26A", "yellow", yellowSound);
        } else if (arr[i] === 4) {
          triggerColor("#green", "#7BB661", "green", greenSound);
        }

        if (i++ < arr.length) {
          theLoop(i);
        } else if (i => arr.length) {
          $(".btn-default").prop("disabled", false);
        }
      }, 1000);
    }
    theLoop(0);
  }

  //update the state of the board
  function updateBoard() {
    userInput = [];
    count++;
    $("#count").html(count);
    randomPattern(1, historyArray);
    convertNumbers(historyArray);
  }

  //starts the game
  function gameStart() {
    historyArray = [];
    count = 0;
    updateBoard();
  }

  //check if you made a mistake in the current move and the state of the game
  function compare() {
    function compareError() {
      error.play();
      $("#count").html("!!");

      if (strict) {
        strict = false;
        $("h1").css("color", "black");
        historyArray = [];
        userInput = [];
        count = 0;
        disableColors(true);
        $("#count").html("-");
      } else {
        window.setTimeout(function() {
          $("#count").html(count);
          userInput = [];
          convertNumbers(historyArray);
        }, 1000);
      }
    }

    if (JSON.stringify(userInput) == JSON.stringify(historyArray)) {
      if (count == 20) {
        $("#count").html("YOU WIN");
        disableColors(true);
      } else {
        updateBoard();
      }
    } else if (userInput.length > 0) {
      for (x = 0; x < userInput.length; x++) {
        if (userInput[x] != historyArray[x]) {
          compareError();
        }
      }
    }
  }

  // [GAME BUTTONS]
  $("#start").on("click", function() {
    strict = false;
    $("h1").css("color", "black");
    gameStart();
  });

  $("#strict").on("click", function() {
    strict = true;
    $("h1").css("color", "red");
    userInput = [];
    gameStart();
  });

  $("#red").on("click", function() {
    triggerColor("#red", "#CB6D51", "red", redSound);
    userInput.push(1);
    compare();
  });

  $("#blue").on("click", function() {
    triggerColor("#blue", "#5F9EA0", "blue", blueSound);
    userInput.push(2);
    compare();
  });

  $("#yellow").on("click", function() {
    triggerColor("#yellow", "#DDE26A", "yellow", yellowSound);
    userInput.push(3);
    compare();
  });

  $("#green").on("click", function() {
    triggerColor("#green", "#7BB661", "green", greenSound);
    userInput.push(4);
    compare();
  });
});
