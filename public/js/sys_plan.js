function SystemPlanner(){

}

SystemPlanner.prototype.getPlan = function(numOfPeople){
    var growthBedSM = 1 * numOfPeople,
        waterTankLt = SystemPlanner.getLtOfWater(numOfPeople),
        kgFish = this.getLtOfWater(numOfPeople) / 50,
        feedFishGr = kgFish / 100,
        grPlant = this.getGrPlant(feedFishGr);

    var retVal = {
        growthBedSM: growthBedSM,
        waterTankLt: waterTankLt,
        kgFish: kgFish,
        feedFishGr: feedFishGr,
        grPlant: grPlant
    }

    return retVal;
}

SystemPlanner.getLtOfWater = function (numOfPeople){
    var retVal = Math.floor(numOfPeople / 4);
    if(numOfPeople % 4 != 0)
        retVal++;

    return retVal * 1000;
}

SystemPlanner.prototype.getGrPlant = function(feedFishGr){
    var retVal = Math.floor(feedFishGr / 30);

    return retVal;
}