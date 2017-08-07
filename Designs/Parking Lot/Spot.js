class Spot {
    constructor(size){
        this.size = size;
        this.vehicle = undefined; // no vehicle on this spot;
    }

    isEmpty(){
        return !this.vehicle;
    }

    canFitVehicle(vehicle) { 
        return  this.isEmpty() && (vehicle.size <= this.size) ;
    }

    getSize(){
        return this.size;
    }

    park(vehicle){
        if(this.canFitVehicle(vehicle)){
            this.vehicle = vehicle;
            return true;
        }
        return false;
    }

    unpark(vehicle){
        let vehicle = this.vehicle;
        this.vehicle = undefined;
        return vehicle;
    }
}
