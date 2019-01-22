export default class WeightedRandomSelector {

    constructor(weightedList) {
        
        this.weightedList = weightedList;

        this.generateRandomInteger = function(min , max) {

            return Math.floor(Math.random() * (max-min) + min);
        }
    }

    getNext() {

        var sum = this.weightedList.reduce((acc, val) => acc + val.weight, 0);
        const rnd = this.generateRandomInteger(0, sum);
    
        var accumulator = 0;
        var index = 0;
    
        do {
            
            accumulator += this.weightedList[index++].weight;
        } 
        while (accumulator < rnd);
    
        return this.weightedList[--index].index;
    }
}