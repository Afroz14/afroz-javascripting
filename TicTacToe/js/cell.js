/* Class which defines each cell and its value . */

function Cell(){
    this.value = "";
}

/* Setter */
Cell.prototype.setValue = function(value){
    this.value = value;
};

/* Getter */
Cell.prototype.getValue = function(){
    return this.value;
};

/* Check if cell is occupied already or not */
Cell.prototype.isOccupied = function(){
    return (this.value) ? true : false;
}