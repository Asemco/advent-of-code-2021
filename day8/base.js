const { getInput, getTestInput } = require('../util');

var tdata = getTestInput("day8"); // Update with correct day
var rdata = getInput("day8"); // Update with correct day
var answer = 0;
var signalPatterns = [];
var outputValues = [];
var letters = [];
var letterSet = [];
var positions = [];

function logData() {
}

function clearData() {
    answer = 0;
    signalPatterns = [];
    outputValues = [];
    letters = [];
    letterSet = [];
    positions = [];
}

function parseData(data) {
    data.forEach(line => {
        var splitLine = line.split("|");
        // Signal Patterns
        var sp = splitLine[0].split(" ");
        sp.pop();
        // console.log("SP",sp);
        signalPatterns.push(sp);

        // Output Values
        var ov = splitLine[1].split(" ");
        ov.shift();
        // console.log("OV", ov);
        outputValues.push(ov);
    });
    // console.log("Signal Patterns: ", signalPatterns);
    // console.log("Output Values: ", outputValues);
}

function validLength(length) {
    return length == 2 || length == 3 || length == 4 || length == 7;
}

function filterEasyLength(array) {
    return array.length == 2 || array.length == 3 || array.length == 4 || array.length == 7
}

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

// For part 2
function solveLetterSet(array) {
        var result = 0;
        var temp = letterSet[5];

        // console.log(array);
        
        // Extract 8, 1, 7 and 4 because they're free.
        letterSet[8] = new Set(array.filter(arr => arr.length == 7)[0].split(""));
        letterSet[1] = new Set(array.filter(arr => arr.length == 2)[0].split(""));
        letterSet[7] = new Set(array.filter(arr => arr.length == 3)[0].split(""));
        letterSet[4] = new Set(array.filter(arr => arr.length == 4)[0].split(""));

        // Extract the 3.  We'll deal with 2 and 5 later.
        var size5Nums = array.filter(arr => arr.length == 5);
        size5Nums.forEach((letters, index) => {
            var size3 = letters.split("").filter(x => !letterSet[7].has(x));
            if (size3.length == 2) {
                letterSet[3] = new Set(letters.split(""));
                // Remove 3 from the current nums, leaving 2 and 5 for later.
                size5Nums.splice(index,1);
            }      
        });

        // With the 3, we can determine what the top left and the middle are.
        temp = new Set(letterSet[1]);
        positions["topLeft"] = difference(letterSet[4], letterSet[3]);
        positions["middleMiddle"] = difference(letterSet[4], temp.add(...positions["topLeft"]));
        temp = temp = new Set(letterSet[3]);

        // Now we can make a 9 for free, the go for 5 and 2.
        letterSet[9] = temp.add(...positions["topLeft"]);

        size5Nums.forEach(letters => {
            var holder = difference(new Set(letters),letterSet[9]);
            // This is a 5, as all spots for 5 overlap with 9
            if (holder.size == 0) {
                letterSet[5] = new Set(letters);
            }
            else { // This is a 2
                letterSet[2] = new Set(letters);
                positions["bottomLeft"] = holder;
            }
        })
        
        temp = new Set(letterSet[5]);
        // 6 is a 5 with a bottom left.
        letterSet[6] = temp.add(...positions["bottomLeft"]);
        // 0 is an 8 without a middle.
        letterSet[0] = difference(letterSet[8], positions["middleMiddle"]);
        
        // console.log("Positions:", positions);
        // console.log(result);
        // console.log(letterSet);
        // console.log(topLine);
}

function solve(part2 = false) {
    if (!part2) {
        signalPatterns.forEach((signalPattern, index) => {
            var sps = signalPattern.filter(filterEasyLength);
            // console.log(sps);
            var ovs = outputValues[index].map(ov => ov.length)
            // console.log(ovs);

            // For each signal pattern, we go over the corresponding output values
            // If the signal pattern has a pattern at the same length as an output value, it's a valid number.
            sps.forEach(pattern => {
                ovs.forEach(v => {
                    if (validLength(pattern.length) && pattern.length == v)
                        answer++;
                })
            });
            // console.log("Current Answer: ", answer);
        });
    }
    else {
        // For each signal pattern
        signalPatterns.forEach((signalPattern, index) => {
            // Reset the answer for this signal pattern
            tempAnswer = '';
            // Solve the set of letters
            solveLetterSet(signalPattern, index);
            // console.log(letterSet);
            
            // Then go through each output value associated with the signal pattern.
            outputValues[index].forEach(outputValue => {
                var ovSet = new Set(outputValue.split(""));
                // Compare each output value to a letter in the letter set.
                // If it exists, we hold onto the number
                [...letterSet].forEach((setticle, ind) => {
                    if (difference(ovSet, setticle).size == 0 && setticle.size == ovSet.size) {
                        tempAnswer += ind;
                    }
                });
                // console.log("Temp Answer:", tempAnswer)
                
            });
            // Then add the number to the answer 
            answer += parseInt(tempAnswer);
            // console.log("Current Answer: ", answer);
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

// console.log("The answer for Part 2 is:", part2(rdata));