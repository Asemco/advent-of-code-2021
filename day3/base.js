const { getInput } = require('../util');

var tdata = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"
];
var rdata = getInput("day3"); // Update with correct day
var answer;

function part1(data) {
    var columns = new Array(data[0].length).fill(0);
    var gamma = 0; 
    var epsilon = 0;
    
    data.forEach( (str)=> {
        for (var i = 0; i < str.length; i++) {
            if (str[i] == "1") columns[i]++;
        }
    });
    
    for (var i = 0; i < columns.length; i++) {
        if (columns[i] > data.length/2) 
            gamma+= (Math.pow(2, columns.length-i-1));
        else 
            epsilon+= (Math.pow(2, columns.length-i-1));
    }

    answer = (gamma*epsilon);
    return answer; // Answer
}

function part2(data) {
    var oxyColumns = [];
    var co2Columns = [];
    var oxygen = 0;
    var co2 = 0;

    if (data.filter(d => d[0] == "1").length > data.length/2) {
        oxyColumns = data.filter(d => d[0] == "1");
        co2Columns = data.filter(d => d[0] == "0");
    }
    else {
        oxyColumns = data.filter(d => d[0] == "0");
        co2Columns = data.filter(d => d[0] == "1");
    }

    for (var i = 0; i < data[0].length; i++) {
        if (oxyColumns.filter(col => col[i] == "1").length >= oxyColumns.length/2) {
            oxyColumns = oxyColumns.filter(col => col[i] == "1");
            oxygen+= Math.pow(2, data[i].length-i-1);
        }
        else
            oxyColumns = oxyColumns.filter(col => col[i] == "0");

        // We filtered the first time outside of the loop.
        // Skip the first loop for co2 to prevent processing a smaller dataset.
        if (i > 0) { 
            if (co2Columns.length == 1)
                co2+= parseInt(co2Columns[0].substr(i), 2);
            
            if (co2Columns.filter(col => col[i] == "1").length < co2Columns.length/2) {
                co2Columns = co2Columns.filter(col => col[i] == "1");
                co2+= Math.pow(2, data[i].length-i-1);
            }
            else 
                co2Columns = co2Columns.filter(col => col[i] == "0");
        }
        else {
            // If the co2 list starts with 1, we add to the co2 rating.
            if (co2Columns[0][0] == 1) 
                co2+= Math.pow(2, data[0].length-1);
        }
    }

    answer = (oxygen * co2);
    return answer; // Answer
}

console.log("The answer for Part 1 Test is:", part1(tdata));

console.log("The answer for Part 2 Test is:", part2(tdata));

console.log("The answer for Part 1 is:", part1(rdata));

console.log("The answer for Part 2 is:", part2(rdata));