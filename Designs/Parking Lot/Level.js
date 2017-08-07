import spotSize from "./SpotSize";

class Level {
    constructor(floor,template){
        this.floor = floor;
        this.parkingSpots = [];
        this._parked = {}
        this._init(template);
    }
    _init(template){
        let LEVEL_CONFIGURATION = [[0,0,2,2,2,2,2,1,1,1],
             [2,2,2,2,2,1,0,0,0,1],
             [2,2,2,2,2,2,2,2,2,2],
             [0,0,0,0,1,1,1,1,1,1],
             [0,0,1,1,2,2,2,2,0,0]
             ];
        for(let i = 0 ;i < 10; i++){
            let newRow = [];
             for(let j = 0; j < 5 ;j++) {
                let spotSize = LEVEL_CONFIGURATION[i][j];
                let spot = new Spot(spotSize);
                newRow.push(spot);
             }
             this.parkingSpots[i] = this.parkingSpots[i] || [];
             this.parkingSpots[i].push(newRow);
        }
    }

    getAvailableSpot(vehicle){
        let spotsNeeded = vehicle.getSize();
        let spots = [];
        for (let i = 0; i < this.parkingSpots.length; i++) {
            let spotsFound = 0;
            for(let j = 0; j < this.parkingSpots[i].length; j++ ){
                let spot = this.parkingSpots[i][j];
                if (spot.canFitVehicle(vehicle)) {
                    spotsFound++;
                } else {
                    spotsFound = 0;
                }
                if (spotsFound == spotsNeeded) {
                    let startIndex = i - (spotsNeeded - 1);
                    for(let k = startIndex; i < spotsNeeded; i++ ) {
                        let foundSpot = this.parkingSpots[i][k];
                        spots.push(foundSpot)
                    }
                    return spots;
                }
            }    
        }
        return spots;
    }

    park(vehicle){
        let spots = this.getAvailableSpot(vehicle);
        if(!spots || !spots.length){
            return false;
        }
        spots.forEach( (spot) => {
           spot.park(vehicle); 
        });
        let key = Math.random();
        this._parked[key] = spots;
        return key;
    }

    unpark(key){
        let spots = this._parked[key];
        if(!spots || !spots.length){
            return;
        }
        delete this._parked[key];
        let vehicle;
        spots.forEach( (spot) => {
           vehicle = spot.unpark(vehicle); 
        });
        return vehicle;
    }

}
