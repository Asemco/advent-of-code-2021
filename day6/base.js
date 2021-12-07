const { getInput, getTestInput, arrayRotate } = require('../util');

var tdata = getTestInput("day6"); // Update with correct day
var rdata = getInput("day6"); // Update with correct day
var answer = 0;
var addFish = 0;
var totalFish = 0;
var fish = [];
var fishState = [];
var originalFish = [];

function logData() {
}

function clearData() {
    answer = 0;
    addFish = 0;
    totalFish = 0;
    fish = [];
}



function parseData(data) {
    var fishSeparated = data[0].split(",").map(num => parseInt(num));

    fishSeparated.forEach(fishes => {
        fish.push(fishes);
    });
    originalFish = new Array(...fish);
    // console.log(fish.length);
}

function solve(part2 = false) {
    if (!part2) {
        for (var i = 0; i < 80; i++) {
            addFish = 0;
            // console.log("Loop " + i +" fish:", fish);
            fish = fish.map(fishDate)
            var newArray = new Array(addFish).fill(8);
            // fish.push(newArray)
            
            fish = newArray.concat(fish);
            // for (var d = 0; i < addFish; i++) {
                
            //     fish.push(8);
            // }
        }
        answer = fish.length;
    } else {
        // console.log("Part 2 begins.");
        // console.log("Original Fish: " , originalFish);
        
        // Create an array with each state of fish
        fishState = new Array(9).fill(0);
        for (var d = 1; d < 6; d++) {   
            var fishOfD = originalFish.filter(f => f == d).length;
            fishState[d] = fishOfD;
        }
        // console.log("Buckets of Fish: ", fishState);
        
        // Allow each fish to give birth when they need to, or don't.
        for (var i = 0; i < 256; i++) {
            // console.log("Pre-Rotate Fish: ", fishState);
            arrayRotate(fishState);
            // console.log("Post-Rotate Fish: ", fishState);
            fishState[6] = fishState[6] + fishState[8];
            // console.log("Post-Reproduction Fish: ", fishState);
        }

        // Total the fish
        fishState.map(f => answer += f);
    }
    

    return answer;
}

function fishDate(num) {
    // We need a new fish added.  
    if (num == 0) {
        num = 7;
        addFish++;
        fish.push(9);
    }

    
    return num-1;
}

function part1(data) {
    clearData();
    
    parseData(data);
    // logData();

    return solve();
}

function part2(data) {
    clearData();
    
    parseData(data);
    // logData();

    return solve(true);
}

console.log("The answer for Part 1 Test is:", part1(tdata));

console.log("The answer for Part 2 Test is:", part2(tdata));

console.log("The answer for Part 1 is:", part1(rdata));

console.log("The answer for Part 2 is:", part2(rdata));