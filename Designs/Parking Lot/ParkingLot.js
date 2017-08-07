class ParkingLot {
    constructor(numLevel,template = ""){
        this.numLevel = numLevel;
        this.levels = [];
        this._parked = {};
        for (let i = 0; i < numLevel; i++) {
            this.levels.push(new Level(i,template));
        }
    }

    park(vehicle){
        for(let i = 0; i < this.levels.length; i++){
            let key = levels[i].park(vehicle);
            if(key){
                this._parked[key] = level[i];
                return key;
            }
        }
        return false;
    }

    unpark(key){
        let level = this._parked[key];
        if(!level){
            return;
        }
        delete this._parked[key];
        let vehicle = level.unpark(key)
        return vehicle;
    }
}
