/*Tic Tac Toe Grid Class */

function Grid(size){

    this.size = size;
    this.grid = [];
    this.filledSquares = 0;
	this.currentPlayer;
}

/* Initialize Grid depend upon the size parameter passed */
Grid.prototype.initializeGrid = function(){

    var i,j;
	this.currentPlayer = "X"; //Let give player 'X' first chance 
	
    for(i = 0; i < this.size; i++){
        this.grid[i] = [];
        for(j = 0; j < this.size; j++){
            this.grid[i][j] = new Cell();
        }
    }
	
};

/* Get Current Player Name */
Grid.prototype.getCurrentPlayer = function(){
		return this.currentPlayer;
};

/* Update New player */	
Grid.prototype.updateCurrentPlayer = function(){
		this.currentPlayer = (this.currentPlayer == "X") ? "Y":"X";
		this.filledSquares++;
};
	
/* Function to check if any Player has won */	
Grid.prototype.checkIfWon = function(x,y){
        var currentPlayer = this.getCurrentPlayer();
		var i;
		
    	//Check Columns 
    	for( i = 0; i < (this.size); i++){
    		if(this.grid[x][i].getValue() != currentPlayer)
    			break;
    		if(i == this.size-1){
    			return true;
    		}
    	}

    	// Check Rows
    	for( i = 0; i < this.size; i++){
    		if(this.grid[i][y].getValue()  != currentPlayer)
    			break;
    		if(i == this.size -1){
    			return true;
    		}
    	}

    	//Check Diagonally
    	if(x == y){
    		for(i = 0; i < this.size; i++){
    			if(this.grid[i][i].getValue()  != currentPlayer)
    				break;
    			if(i == this.size-1){
					return true;
    			}
    		}
    	}

        // Check Anti Diagonal
    	for(i = 0;i<this.size;i++){
    		if(this.grid[i][(this.size-1)-i].getValue()  != currentPlayer)
    			break;
    		if(i == this.size-1){
    			return true;
    		}
    	}
		
        /* If all above conditions do not return true , simply return false */
    	return false;
		
	};	

	
//Update the grid on each player turn */
Grid.prototype.update = function(cell,x,y){

   // base case : check if the cell is occupied already ?
   if(this.grid[x][y].isOccupied())
    {
	   alert("Occupied ");
	   return ;
	}
 
   this.grid[x][y].setValue(this.getCurrentPlayer());
   cell.innerHTML = this.getCurrentPlayer(); // set <td> content to player symbol
   
   //On each player turn check any of the player has won ? 
   if(this.checkIfWon(x,y))
     {
	    alert("Congrats " + this.getCurrentPlayer() + " has Won !" );
		this.reset(); // start new Game
	 }
	// Check for draw conditions too  
	else if(this.filledSquares == Math.pow(this.size, 2) - 1){
    		alert(' Match Draw !');
			this.reset(); // start new Game
	 }
   else{
        this.updateCurrentPlayer(); // if both of the above conditions are false , simple give another chance to next player
   }   
        
};
/* Create Tic Tac toe grid to be displayed on Web Page */
Grid.prototype.displayGrid = function(){

		var gridBoard = document.createElement("table");
		var _this = this;
		var row,cell;
	    for (i = 0; i < this.size; i++) {
			row = document.createElement("tr");
			gridBoard.appendChild(row);
			for (j = 0; j < this.size; j++) {
				  cell = document.createElement("td");
				  cell.width = cell.height = 50;
				  cell.align = cell.valign = 'center';
				  cell.style.color= 'green';
				  row.appendChild(cell);
				  /* Javascript : The Infamous Loop Problem */
				  (function(i_index,y_index){ 
						cell.onclick = function(){ _this.update(this,i_index,y_index)}; // Attach each cell On Click listener 
			       })(i,j);
			}
		
	    }
			
		 /*Lets apply some style on Table */	
		 gridBoard.border = 1;
		 gridBoard.style.borderCollapse='collapse';
         gridBoard.style.borderColor = "#333";
		 
		 /* attach gridBoard to parent Div */
		 var parent = document.getElementById("tic_tac_toe_game") ;
		 parent.appendChild(gridBoard);	
}; 

/* Reset Tic Tac Toe Grid to start game again */
Grid.prototype.reset = function(){

    document.getElementById("tic_tac_toe_game").innerHTML = ''; // Clear Div container 
	
	/*Reset each values and start game */
	this.filledSquares = 0;
	this.grid = [];
    this.initializeGrid();
    this.displayGrid();
       
};

		