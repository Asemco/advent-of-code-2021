const { getInput, getTestInput } = require('../util');

var tdata = getTestInput("day7"); // Update with correct day
var rdata = getInput("day7"); // Update with correct day
var answer = 0;
var crabs = [];

function logData() {
}

function clearData() {
    answer = 0;
    crabs = [];
}

function parseData(data) {
    crabs = data[0].split(",").map(num => parseInt(num)).sort((a, b) =>{return a-b});
}

function getMedian(data) {
    var size = data.length;

    if (size % 2 == 0) {
        return (data[size/2] + data[size/2-1]) / 2;
    }
    else {
        return (data[Math.floor(size/2)]);
    }
}

function getMean(data) {
    var sum = 0;
    data.forEach(num => {
        sum+= num
    });
    var mean = Math.floor(sum/data.length); 
    // console.log("Sum is: ", sum);
    // console.log("Length is: ", data.length);
    // console.log("Mean (Un-Mathed) is: ", sum/data.length);
    // console.log("Mean is: ", mean);
    return mean;
}

function solve(part2 = false) {
    if (!part2) {
        // Get the median value, where all crabs must go to.
        var median = getMedian(crabs);

        crabs.forEach(crab => {
            // console.log("Current Number: " + crab);
            if (crab > median) {
                // console.log("crab bigger than median", crab - median);
                answer += crab - median;
            }
            else if (crab < median) {
                // console.log("crab less than median", crab + median);
                answer += median - crab;
            }
        });
    }
    else {
        // We are using mean, but the mean is not quite accurate for getting the answer.
        // The correct answer will be the mean +/- 0.5 though.
        var mean = getMean(crabs);
        // console.log("mean is: ", mean);
        crabs.forEach(crab => {
            var steps = 1;
            var min = 0;
            var max = 0;
            if (crab > mean) {
                // console.log("Crab bigger than mean", crab);
                min = mean;
                max = crab;
            }
            else if (crab < mean) {
                // console.log("Crab less than mean", crab);
                min = crab;
                max = mean;
            }
            
            for (var i = min; i < max; i++) {
                answer += steps;
                // if (crab < 20)
                //     console.log("i/min = " + i + " | max = " + max + " | Steps: " + steps + " | Answer: ", answer);
                steps++;
            }
            
        });
    }

    return answer;
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

// console.log("The answer for Part 1 Test is:", part1(tdata));

console.log("The answer for Part 2 Test is:", part2(tdata));

// console.log("The answer for Part 1 is:", part1(rdata));

console.log("The answer for Part 2 is:", part2(rdata));