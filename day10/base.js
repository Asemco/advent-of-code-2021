const { getInput, getTestInput } = require('../util');

var tdata = getTestInput("day10"); // Update with correct day
var rdata = getInput("day10"); // Update with correct day
var answer = 0;
var lineFormat = {
    '[': 0,
    '(': 0,
    '<': 0,
    '{': 0,
    ']': 0,
    ')': 0,
    '>': 0,
    '}': 0,
    'data': []
}
var scores = [];

var lines = [];

function logData() {
}

function clearData() {
}

function parseData(data) {
    
    data.forEach(line => {
        var temp = JSON.parse(JSON.stringify(lineFormat));
        
        line.split("").forEach(c => {
            temp[c]++;
            temp['data'].push(c);
        })
        lines.push(temp);
        // console.log(temp);
    });
}

function isOpening(symbol) {
    return symbol == '{' || symbol == '(' || symbol == '<' || symbol == '[';
}

function solve(part2 = false) {

    if (!part2) { 
        lines.forEach((line, index) => {
            // console.log(line)
            var counter = 0;
            var tempFormat = JSON.parse(JSON.stringify(lineFormat));
            // console.log(line['data'])
            // if (line['data'].length % 2 == 0) {
            //     console.log(line);
            // }

            for (let i = 0; i < line['data'].length; i++) {
                const stax = line['data'][i];
                
                if (isOpening(stax)) {
                    tempFormat.data.push(stax);
                    counter++;
                    tempFormat[stax]++;
                }
                else {
                    var holder = tempFormat.data.pop();
                    if (index == 0) console.log("Top of stack is: " + holder + " | Current symbol: ", stax);
                    if (holder != '{' && stax == '}') {
                        answer += 1197;
                        break;
                    }
                    else if (holder != '(' && stax == ')') {
                        answer += 3;
                        break;
                    }
                    else if (holder != '<' && stax == '>') {
                        answer += 25137;
                        break;
                    }
                    else if (holder != '[' && stax == ']') {
                        answer += 57;
                        break;
                    }
                        counter--;
                        tempFormat[stax]++;
                }
                // if (index == 2) console.log(tempFormat.data, counter);
                
            }

            // if (index == 2) console.log("Current Stack: ", tempFormat.data);
        });

    } else {
        lines.forEach((line, index) => {
            // console.log(line)
            var skipLine = false;
            var tempFormat = JSON.parse(JSON.stringify(lineFormat));
            // console.log(line['data'])
            // if (line['data'].length % 2 == 0) {
            //     console.log(line);
            // }

            for (let i = 0; i < line['data'].length; i++) {
                const stax = line['data'][i];
                
                if (isOpening(stax)) {
                    tempFormat.data.push(stax);
                    tempFormat[stax]++;
                }
                else {
                    var holder = tempFormat.data.pop();
                    // if (index == 0) console.log("Top of stack is: " + holder + " | Current symbol: ", stax);
                    if (holder != '{' && stax == '}') {
                        skipLine = true;
                        break;
                    }
                    else if (holder != '(' && stax == ')') {
                        skipLine = true;
                        break;
                    }
                    else if (holder != '<' && stax == '>') {
                        skipLine = true;
                        break;
                    }
                    else if (holder != '[' && stax == ']') {
                        skipLine = true;
                        break;
                    }
                        tempFormat[stax]++;
                }
                // if (index == 2) console.log(tempFormat.data, counter);
                
            }

            // if (index == 9) console.log("Current Data: ", tempFormat);
            if (!skipLine) {
                // console.log ("Completing line ", index+1)
                // Finish the line piece

                var tempAnswer = 0;
                while (tempFormat.data.length > 0) {
                    const holder = tempFormat.data.pop();
                    
                    // if (index == 9) console.log("Top of stack is: ", holder);

                    if (holder == '{') {
                        tempAnswer = (tempAnswer * 5) + 3;
                    }
                    else if (holder == '(') {
                        tempAnswer = (tempAnswer * 5) + 1;
                    }
                    else if (holder == '<') {
                        tempAnswer = (tempAnswer * 5) + 4;
                    }
                    else if (holder == '[') {
                        tempAnswer = (tempAnswer * 5) + 2;
                    }
                }
                // console.log("Temporary Answer: ", tempAnswer);
                scores.push(tempAnswer);
            }
        });
        var tempAnswer = scores.sort((a, b) => a - b).splice(scores.length/2)[0];
        answer = tempAnswer;
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

// console.log("The answer for Part 2 Test is:", part2(tdata));

// console.log("The answer for Part 1 is:", part1(rdata));

console.log("The answer for Part 2 is:", part2(rdata));