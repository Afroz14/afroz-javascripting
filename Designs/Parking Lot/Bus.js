import spotSize from "./SpotSize";

class Bus extends Vehicle {
    constructor(licensePlate){
        super(licensePlate,spotSize.LARGE);
    }
}
