const { getInput, getTestInput } = require('../util');

var tdata = getTestInput("day_"); // Update with correct day
var rdata = getInput("day_"); // Update with correct day
var answer = 0;

function logData() {
}

function clearData() {
}

function parseData(data) {
}

function solve(part2 = false) {
    
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

console.log("The answer for Part 1 Test is:", part1(tdata));

console.log("The answer for Part 2 Test is:", part2(tdata));

console.log("The answer for Part 1 is:", part1(rdata));

console.log("The answer for Part 2 is:", part2(rdata));