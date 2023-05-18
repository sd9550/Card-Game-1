var cardImages = [];
var cardValues = [];
var gameStarted = false;
var gameWins = 0;
var gameLosses = 0;
var gameDraws = 0;

// setup arrays for images/values on page load
$(document).ready(function() {
    const c = 52;
    var value = 1;

    for (var i = 1; i <= c; i++) {
        cardImages.push("images/" + i + ".png");
        cardValues.push(value);
        // boost value after 4 of the same card beside tens
        if(i % 4 === 0 && value <= 9) {
            value += 1;
        }
    }
    console.log(cardValues);
});

function drawCards() {
    var playerCard = Math.floor(Math.random() * 52);
    var enemyCard = Math.floor(Math.random() * 52);

    // try again if cards are the same
    if(playerCard === enemyCard) {
        drawCards();
    }

    var url1 = "url(" + cardImages[enemyCard] + ")";
    var url2 = "url(" + cardImages[playerCard] + ")";

    $(".enemy-box").css("background-image", url1);
    $(".player-box").css("background-image", url2);

    $(".titles").css("opacity", "100");

    gameSummary(cardValues[enemyCard], cardValues[playerCard]);

    console.log("P:" + playerCard)
    console.log("E:" + enemyCard)
}

function gameSummary(e, p) {
    if(e > p) { // loss
        $(".game-header").text("You lose. Press any key to restart");
        gameLosses++;
    } else if (p > e) { // win
        $(".game-header").text("You win. Press any key to restart");
        gameWins++;
    } else { // tie
        $(".game-header").text("Draw. Press any key to restart");
        gameDraws++;
    }

    $(".counter").text("Wins: " + gameWins + " - Losses: " + gameLosses + " - Draws: " + gameDraws);
    $(".counter").css("opacity", "100");
    gameStarted = false; // restart game on keypress
}

$(document).on("keydown", function() {

    if(!gameStarted) {
        gameStarted = true;
        
        drawCards();
    }
    
});