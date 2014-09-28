//Start Tic Tac Toe as soon as page loads

(function GameStart(){
    var BOARD_SIZE = 3; // Change as per game .
    var ticTacToeGame = new TicTacToeGame(BOARD_SIZE);
	
	//Lets Play
    ticTacToeGame.play();
	
	
})();