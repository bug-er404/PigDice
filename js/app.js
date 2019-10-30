// Javascript code
// Global variable to hold player names:
var firstName;
var secondName;

// Variable to hold current player turn.
var playerTurn;

// Variable to hold player score.
var p1score;
var p2score;

// Variable to hold temp player score for each turn.
var p1temp;
var p2temp;

// Function to start the game when start button is pressed
function initiateGame(){
    // Checking if name is given. If not, default name is initialized.
    if(document.getElementById("firstPlayer").value == "")
    {
        firstName = "Player 1";
    }else{
        firstName = document.getElementById("firstPlayer").value;
    }

    if(document.getElementById("secondPlayer").value == "")
    {
        secondName = "Player 2";
    }else{
        secondName = document.getElementById("secondPlayer").value;
    }
}

function setActivePlayer(turn){
    // Player 1 turn
    if(turn==false)
    {
        playerTurn = false;
        $("#player1area").css("background-color", "#ddd");
        $("#player2area").css("background-color", "#5b7ea1");
        $("#player1area #rollArea").show();
        $("#player2area #rollArea").hide();
    }
    // Player 2 turn
    else{
        playerTurn = true;
        $("#player2area").css("background-color", "#ddd");
        $("#player1area").css("background-color", "#5b7ea1");
        $("#player2area #rollArea").show();
        $("#player1area #rollArea").hide();
    }
}

function calculatePlayerScore(die1, die2, playerTurn){
    // Player 1 score
    if(playerTurn==false){
        p1temp = p1temp + die1 + die2;
        $("#p1current span").html(p1temp);
        if(p1score + p1temp >= 100){
            p1score = p1score + p1temp;
            displayWinMessage(false);
        }
    }
    // Player 2 score
    else{
        p2temp = p2temp + die1 + die2;
        $("#p2current span").html(p2temp);
        if(p2score + p2temp >= 100){
            p2score = p2score + p2temp;
            displayWinMessage(true);
        }
    }
}

function displayWinMessage(player){
    $(".endGameArea").css("display","block");
    // Player 1 wins
    if(player==false)
    {
        $("#player1area #resultArea").html("YOU WIN !!!").addClass("winMessage").fadeIn();
        $("#player2area #resultArea").html("Try again next time :(").addClass("tryAgainMessage");
        $("#player1area #rollArea").hide();
        $('#flashMessage').html(firstName + " WINS THE Game!" + " Total Score: " +
        p1score).slideDown(7000);
    }
    // Player 2 wins
    else{
        $("#player2area #resultArea").html("YOU WIN !!!").addClass("winMessage");
        $("#player1area #resultArea").html("Try again next time :(").addClass("tryAgainMessage");
        $("#player2area #rollArea").hide();
        $('#flashMessage').html(secondName + " WINS THE Game!"+ " Total Score: " +
        p2score).slideDown(7000);
    }

    // Scroll down and display after game options
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });

    // Reloading page msg
    setTimeout(
        function() 
        {       
            let timerInterval
            Swal.fire({
              title: 'Another game?',
              type: 'question',
              html: 'The chances do not get worse! <br><br> Reloading game in: <b></b> seconds.',
              timer: 3000,
              onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  Swal.getContent().querySelector('b')
                    .textContent = (Math.round(Swal.getTimerLeft()/1000))
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.timer
              ) {
                console.log('I was closed by the timer')
              }
            })
        }, 5000);

        setTimeout(function(){
            location.reload();
        }, 8000);

}

// Jquery
//$( document ).ready() shortcode
$(function(){
     // Function to scroll to game area when ready.
    $("#startgame").click(function(){
        // Hide information section and display game area.
        $(".getName").hide();
        $(".footer").hide();
        $(".gamearea").fadeIn().css("display", "grid");
        
        // Show player names.
        $("#p1name").html(firstName);
        $("#p2name").html(secondName);

        // Give player 1 the first turn.
        playerTurn = false;
        setActivePlayer(playerTurn);
        // Set score to 0.
        p1score = p2score = p1temp = p2temp = 0;
        $("#p1score span").html("0");
        $("#p2score span").html("0");
        $("#p1current span").html("0");
        $("#p2current span").html("0");                
        
        // scroll to game
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });

        setTimeout(
            function() 
            {       
                // Sweet Alert notification
                Swal.fire({
                    position: 'top-right',
                    type: 'success',
                    title: 'All set! Remember to pass the turn to save your score!',
                    showConfirmButton: false,
                    timer: 2500
                  })
            }, 900);
    });

    // Function to reload page:
    $(".swal2-confirm").click(function(){
        location.reload();
    });

    // Function to roll dice when prompted.
    $(".rollDice").click(function(){

         // Generate random number for die
         die1 = Math.floor((Math.random() * 6) + 1);
         die2 = Math.floor((Math.random() * 6) + 1);

        // Player 1 turn
        if(playerTurn==false){
            // Generate die images
            $("#p1die1").html("<img src = img/" + die1 + ".png id = 'dice'>");
            $("#p1die2").html("<img src = img/" + die2 + ".png id = 'dice'>");

            // Checking for 1 on either die
            if(die1 == 1 || die2 == 1){
                // Double 1 condition:
                if(die1==1 && die2==1){
                    calculatePlayerScore(10,15,false);
                }
                // Single 1 condition:
                else{
                    p1temp = 0;
                    $("#p1current span").html(p1temp);
                    setActivePlayer(true);
                }
            }
            // No 1 on either die:
            else{
                calculatePlayerScore(die1, die2, false);
            }
        }
        // Player 2 turn
        else{
            // Generate die images
            $("#p2die1").html("<img src = img/" + die1 + ".png id = 'dice'>");
            $("#p2die2").html("<img src = img/" + die2 + ".png id = 'dice'>");

            // Checking for 1 on either die
            if(die1 == 1 || die2 == 1){
                // Double 1 condition:
                if(die1==1 && die2==1){
                    calculatePlayerScore(10,15,true);
                }
                // Single 1 condition:
                else{
                    p2temp = 0;
                    $("#p2current span").html(p1temp);
                    setActivePlayer(false);
                }
            }
            // No 1 on either die:
            else{
                calculatePlayerScore(die1, die2, true);
            }
        }
    });

    // Function to save the current score when prompted.
    $(".passTurn").click(function(){
        // P1 Passes turn
        if(playerTurn==false){
            // Recording final score and reseting turn score.
            p1score = p1score + p1temp;
            p1temp = 0;
            $("#p1score span").html(p1score);
            $("#p1current span").html(p1temp);
            setActivePlayer(true);
        }
        // P2 Passes turn
        else{
            // Recording final score and reseting turn score.
            p2score = p2score + p2temp;
            p2temp = 0;
            $("#p2score span").html(p2score);
            $("#p2current span").html(p2temp);
            setActivePlayer(false);
        }
    });


});
