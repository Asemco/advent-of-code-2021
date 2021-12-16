const { getInput, getTestInput, clone } = require('../util');

var tdata = getTestInput("day11"); // Update with correct day
var rdata = getInput("day11"); // Update with correct day
var answer = 0;
var octos = [];
var flashed = [];
var baseFlashed = [];
var flashing = [];
var toFlash = [];

function logData() {
    octos.forEach(line => {
        console.log(line.toString().replaceAll(",", " "));
    });
    console.log("--------------------");
}

function clearData() {
    octos = [];
    flashed = [];
    baseFlashed = [];
    flashing = [];
    toFlash = [];
}

function parseData(data) {
    data.forEach(line => {
        octos.push(line.split(""));
        baseFlashed.push(new Array(line.split("").length).fill(false));
    });
}

function flashNeighbour(yAxis, xAxis) {
    // Ensure we don't go out of bounds on the x Axis
    if (xAxis - 1 >= 0) {
        // Increment Left
        octos[yAxis][xAxis-1]++;
        if (octos[yAxis][xAxis-1] >= 10 && !flashed[yAxis][xAxis-1]) {
            flashing.unshift([yAxis, xAxis-1]);
            flashed[yAxis][xAxis-1] = true;
        }
        
        // Check Up and Left
        if (yAxis - 1 >= 0) {
            octos[yAxis-1][xAxis-1]++;
            if (octos[yAxis-1][xAxis-1] >= 10 && !flashed[yAxis-1][xAxis-1]) {
                flashing.unshift([yAxis-1, xAxis-1]);
                flashed[yAxis-1][xAxis-1] = true;
            }
        }

        // Check Down and Left
        if (yAxis + 1 < octos.length) {
            octos[yAxis+1][xAxis-1]++;
            if (octos[yAxis+1][xAxis-1] >= 10 && !flashed[yAxis+1][xAxis-1]) {
                flashing.unshift([yAxis+1, xAxis-1]);
                flashed[yAxis+1][xAxis-1] = true;
            }
        }
    }

    if (xAxis + 1 < octos[0].length) {
        // Check Right
        octos[yAxis][xAxis+1]++;
        if (octos[yAxis][xAxis+1] >= 10 && !flashed[yAxis][xAxis+1]) {
            flashing.unshift([yAxis, xAxis+1]);
            flashed[yAxis][xAxis+1] = true;
        }
        
        // Check Up and Right
        if (yAxis - 1 >= 0) {
            octos[yAxis-1][xAxis+1]++;
            if (octos[yAxis-1][xAxis+1] >= 10 && !flashed[yAxis-1][xAxis+1]) {
                flashing.unshift([yAxis-1, xAxis+1]);
                flashed[yAxis-1][xAxis+1] = true;
            }
        }

        // Check Down and Right
        if (yAxis + 1 < octos.length) {
            octos[yAxis+1][xAxis+1]++;
            if (octos[yAxis+1][xAxis+1] >= 10 && !flashed[yAxis+1][xAxis+1]) {
                flashing.unshift([yAxis+1, xAxis+1]);
                flashed[yAxis+1][xAxis+1] = true;
            }
        }
    }

    // Ensure we don't go out of bounds on the y Axis
    if (yAxis - 1 >= 0) {
        octos[yAxis-1][xAxis]++;
        if (octos[yAxis-1][xAxis] >= 10 && !flashed[yAxis-1][xAxis]) {
            flashing.unshift([yAxis-1, xAxis]);
            flashed[yAxis-1][xAxis] = true;
        }
    }

    if (yAxis + 1 < octos[0].length) {
        octos[yAxis+1][xAxis]++;
        if (octos[yAxis+1][xAxis] >= 10 && !flashed[yAxis+1][xAxis]) {
            flashing.unshift([yAxis+1, xAxis]);
            flashed[yAxis+1][xAxis] = true;
        }
    }
}

function checkIfSynced() {
    var synced = true;
    // flashed.forEach(line => {
    //     synced = line.filter(state => state == true).length == 10 ? true : false;
    //     if (!synced) return synced;
    // });
    for (let i = 0; i < octos.length; i++) {
        const line = octos[i];
        // console.log(line.filter(octo => octo == 0).length);
        synced = (line.filter(octo => octo == 0).length == 10) ? true : false;
        // console.log(synced);
        if (!synced) {
            break;
        }
            
    }
    return synced;
}

function resetOctos() {
    octos.forEach((line, yAxis) => {
        line.forEach((octo, xAxis) => {
            if (octo >= 10) {
                octos[yAxis][xAxis] = 0;
            }
        });
    });
}


function solve(part2 = false) {

    if (!part2) {

        // logData();
        for (let i = 0; i < 100; i++) {      
            flashed = JSON.parse(JSON.stringify(baseFlashed))
            octos.forEach((line, yAxis) => {
                line.forEach((octo, xAxis) => {
                    octos[yAxis][xAxis]++;
                    if (octos[yAxis][xAxis] >= 10) {
                        flashing.push([yAxis, xAxis]);
                        flashed[yAxis][xAxis] = true;
                    }
                });
            });
            // logData();
            // console.log("After Step " + (i+1) + " | We need to flash these: ", flashing);
            // if (i == 3) console.log("Flashed at this state", flashed);
            while (flashing.length > 0) {
                var coordinates = flashing.shift();
                // if (i == 3) {
                //     logData();
                //     console.log("Flashing these now: ", coordinates);
                // }
                // octos[coordinates[0]][coordinates[1]] = 0;
                flashNeighbour(coordinates[0], coordinates[1]);
                answer++;
            }
            resetOctos();
        }
    } else {
        for (let i = 0; i < 10000000; i++) {      
            flashed = clone(baseFlashed);
            octos.forEach((line, yAxis) => {
                line.forEach((octo, xAxis) => {

                    octos[yAxis][xAxis]++;
                    if (octos[yAxis][xAxis] >= 10) {
                        flashing.push([yAxis, xAxis]);
                        flashed[yAxis][xAxis] = true;
                    }
                });
            });
            while (flashing.length > 0) {
                var coordinates = flashing.shift();
                flashNeighbour(coordinates[0], coordinates[1]);
                answer++;
            }

            resetOctos();

            if (checkIfSynced()) {
                console.log("After Step ", i+1)
                logData();
                answer = i+1;
                break;
            }
            
            // logData();
        }
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