const { getInput, getTestInput } = require('../util');

var tdata = getTestInput("day9"); // Update with correct day
var rdata = getInput("day9"); // Update with correct day
var answer = 0;
var lowPoints = 0;
var flows = [];
var basins = [];
var baseTouched = [];
var toSearch = [];
var basin = [];

function logData() {
}

function clearData() {
    answer = 0;
    lowPoints = 0;
    flows = [];
    basins = [];
    basin = [];
    touched = [];
    toSearch = [];
}

function parseData(data) {
    data.forEach(line => {
        flows.push(line.split(""));
        baseTouched.push(new Array(line.split("").length).fill(false));
    });
}

// function verticalSearch(line, basin, lIndex, i, lookLeft) {
//     // Look to the North
//     for (let d = lIndex-1; d >= 0; d--) {
//         if (flows[d][i] == 9) {
//             d = 0;
//         }   
//         else if (!touched[d][i]) {
//             touched[d][i] = true;
//             basin.push(flows[d][i]);
//         }
//     }
//     // Look to the South
//     for (let d = lIndex+1; d < flows.length; d++) {
//         if (flows[d][i] == 9) {
//             d = flows.length;
//         }   
//         else if (!touched[d][i]) {
//             touched[d][i] = true;
//             basin.push(flows[d][i]);
//         }
//     }
// }

// function horizontalSearch(line, basin, lIndex, nIndex) {
//     // Look to the East
//     for (let i = nIndex + 1; i < line.length; i++) {
//         const horiNumber = line[i];
//         // console.log("Horinumber is now: ",horiNumber)
//         if (horiNumber == 9) {
//             verticalSearch(line, basin, lIndex, i-1);
//             break; 
//         }
//         else if (!touched[lIndex][i]) {
//             touched[lIndex][i] = true;
//             basin.push(horiNumber);
//         }
//         verticalSearch(line, basin, lIndex, i);
//     }
//     // Look to the West
//     for (let i = nIndex - 1; i >= 0; i--) {
//         const horiNumber = line[i];
//         // console.log("Horinumber is now: ",horiNumber)
//         if (horiNumber == 9) {
//             verticalSearch(line, basin, lIndex, i+1);
//             break; 
//         }
//         else if (!touched[lIndex][i]) {
//             touched[lIndex][i] = true;
//             basin.push(horiNumber);
//         }
//         verticalSearch(line, basin, lIndex, i);
//     }
// }

function checkAround(lIndex, nIndex) {
    // Add the current value to the basin, as it's not a 9.  This is known.
    basin.push(flows[lIndex][nIndex]);
    // We also mark it as touched so we don't double dip
    touched[lIndex][nIndex] = true;
    
    // Look around the number at the given index clockwise from north
    
    // Ensure we don't go out of bounds
    if (lIndex+1 < flows.length) {
        // If the value has not been touched, and it's not a 9, we will check around it as well.
        if (!touched[lIndex+1][nIndex] && flows[lIndex+1][nIndex] != 9) {
            // Mark it as touched so it's not revisted later
            touched[lIndex+1][nIndex] = !touched[lIndex+1][nIndex];
            // Add this value to be searched later.B
            toSearch.push([lIndex+1,nIndex]);
        }
    }

    // Ensure we don't go out of bounds
    if (nIndex+1 < flows[0].length) {
        // If the value has not been touched, and it's not a 9, we will check around it as well.
        if (!touched[lIndex][nIndex+1] && flows[lIndex][nIndex+1] != 9) {
            // Mark it as touched so it's not revisted later
            touched[lIndex][nIndex+1] = !touched[lIndex][nIndex+1];
            // Add this value to be searched later.B
            toSearch.push([lIndex,nIndex+1]);
        }
    }

    // Ensure we don't go out of bounds
    if (lIndex-1 >= 0) {
        // If the value has not been touched, and it's not a 9, we will check around it as well.
        if (!touched[lIndex-1][nIndex] && flows[lIndex-1][nIndex] != 9) {
            // Mark it as touched so it's not revisted later
            touched[lIndex-1][nIndex] = !touched[lIndex-1][nIndex];
            // Add this value to be searched later.B
            toSearch.push([lIndex-1,nIndex]);
        }
    }

    // Ensure we don't go out of bounds
    if (nIndex-1 >= 0) {
        // If the value has not been touched, and it's not a 9, we will check around it as well.
        if (!touched[lIndex][nIndex-1] && flows[lIndex][nIndex-1] != 9) {
            // Mark it as touched so it's not revisted later
            touched[lIndex][nIndex-1] = !touched[lIndex][nIndex-1];
            // Add this value to be searched later.B
            toSearch.push([lIndex,nIndex-1]);
        }
    }
    // if (lIndex == 0) console.log("ToSearch when lIndex == 0", toSearch);
}

function solve(part2 = false) {
    
    if (!part2) {
        flows.forEach((line, lIndex) => {
            line.forEach((number, nIndex) => {
                var smoll = true;

                if (lIndex - 1 >= 0) {
                    smoll = (number < flows[lIndex-1][nIndex]);
                }
                
                if (smoll && lIndex + 1 < flows.length) {
                    smoll = (number < flows[lIndex+1][nIndex]);
                }
                
                if (smoll && nIndex - 1 >= 0) {
                    smoll = (number < flows[lIndex][nIndex-1]);
                }
                
                if (smoll && nIndex + 1 < line.length) {
                    smoll = (number < flows[lIndex][nIndex+1]);
                }

                // if (lIndex == 1) {
                //     console.log("Number: " + number + " | lIndex: " + lIndex + " | nIndex: " + nIndex + " | Smoll: " + smoll);
                //     console.log(number < flows[lIndex-1][nIndex], flows[lIndex-1][nIndex]);
                //     console.log(number < flows[lIndex][nIndex+1], flows[lIndex][nIndex+1]);
                //     console.log(number < flows[lIndex][nIndex-1], flows[lIndex][nIndex-1]);
                //     console.log(number < flows[lIndex+1][nIndex], flows[lIndex+1][nIndex]);
                // }
                
                if (smoll) {
                    // console.log("We found a smoll", number);
                    answer += (parseInt(number) + 1);
                }
            });
        });
    } else {
        flows.forEach((line, lIndex) => {
            line.forEach((number, nIndex) => {
                touched = new Array(...baseTouched);
                toSearch = [];
                basin = [];
                var smoll = true;

                if (lIndex - 1 >= 0) {
                    smoll = (number < flows[lIndex-1][nIndex]);
                }
                
                if (smoll && lIndex + 1 < flows.length) {
                    smoll = (number < flows[lIndex+1][nIndex]);
                }
                
                if (smoll && nIndex - 1 >= 0) {
                    smoll = (number < flows[lIndex][nIndex-1]);
                }
                
                if (smoll && nIndex + 1 < line.length) {
                    smoll = (number < flows[lIndex][nIndex+1]);
                }
                
                if (smoll) {
                    // console.log("Smoll: ", number);
                    
                    // count = 0;
                    checkAround(lIndex, nIndex);
                    while (toSearch.length > 0) {
                        var coordinates = toSearch.pop();
                        checkAround(coordinates[0], coordinates[1]);
                    }
                    
                    // var stopDirection = [false, false, false, false]; // Compass Style Clockwise N, E, S, W
                    // Memory of a hard time
                    // verticalSearch(line, basin, lIndex, nIndex);
                    // horizontalSearch(line, basin, lIndex, nIndex);
                    
                    // console.log("Basin for " + number, basin);

                    basins.push(basin);
                }
                
            });
            // console.log("Basins: ", basins);
        });
        
        // basins.map(x => x.length): Get the length of each basin
        // sort( (a, b) => b - a): Sort from largest to smallest
        // splice(0,3): Cut off the first 3 basins from the rest (3 largest)
        // reduce((a, b) => a * b): Take the current value and multiply it by the next value
        answer = basins.map(x => x.length).sort( (a, b) => b - a).splice(0,3).reduce((a, b) => a * b);
    }

    return answer;
}

function part1(data) {
    clearData();
    
    parseData(data);
    logData();

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