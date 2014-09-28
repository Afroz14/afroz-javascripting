/* Tic Tac Toe Main Driver Class */
function TicTacToeGame(size){

    //Initialize and build Tic Tac Toe Grid
    this.grid = new Grid(size); 
	
    this.play = function(){
	
	    this.grid.initializeGrid();
        this.grid.displayGrid();
		
    };
	
	   
}