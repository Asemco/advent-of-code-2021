const { getInput, getTestInput } = require('../input');

var tdata = getTestInput("day5"); // Update with correct day
var rdata = getInput("day5"); // Update with correct day
var answer = 0;
var points = []; 
var startCoords = [];
var endCoords = [];

function logData() {
    console.log("startCoords: ", startCoords);
    console.log("endCoords: ", endCoords);
    console.log("points: ", points);
}

function clearData() {
    answer = 0;
    points = []; 
    startCoords = [];
    endCoords = [];
}

function parseData(data) {
    var upper = 0;

    data.forEach(line => {
        // Separate out each set of coordinates.
        var splitLine = line.replaceAll(" ", "").split("->");
        
        // Separate out each pair of coordinates
        var start = splitLine[0].split(",").map(x => parseInt(x));
        var end = splitLine[1].split(",").map(x => parseInt(x));

        // Find the largest X and Y value between the pairs
        var lineX = Math.max(...start);
        var lineY = Math.max(...end);

        // console.log("Max LineX: " + lineX + " | Max LineY: ", lineY);

        // Set our upperX and upperY, furthest the grid will go.
        upper = (upper < (lineX || lineY) ? lineX : upper);
        startCoords.push(start);
        endCoords.push(end);
        
    });
    // Add 1 to upper since we actually start at 0.
    upper++;
    for (let i = 0; i < upper; i++) {
        points.push(new Array(upper).fill(0));
    }
    // console.log(points);
}

function solve(part2 = false) {
    
    startCoords.forEach((coord, index) => {
        var start = 0;
        var end = 0;
        // console.log("Next Line!");
        // console.log("Start coords are ", coord);
        // console.log("End coords are ", endCoords[index]);

        // The x Coordinate remains the same, so it's a vertical line
        if (coord[0] == endCoords[index][0]) {
            // console.log("Issa vertical!");
            
            // The end coordinate is larger than the start coordinate
            if (coord[1] < endCoords[index][1]) {
                start = coord[1];
                end = endCoords[index][1];
            }
            else {
                start = endCoords[index][1];    
                end = coord[1];
            }
            
            // Mark the point in the points array
            for (var i = start; i <= end; i++) {
                points[i][coord[0]]++;
            }
            // console.log(points[coord[0]]);
        }
        // The y Coordinate remains the same, so it's a horizontal line
        else if (coord[1] == endCoords[index][1]) {
            // console.log("Issa horizontal!");
            
            // The end coordinate is larger than the start coordinate
            if (coord[0] < endCoords[index][0]) {
                start = coord[0];
                end = endCoords[index][0];
            }
            else {
                start = endCoords[index][0];    
                end = coord[0];
            }
            
            // Mark the point in the points array
            for (var i = start; i <= end; i++) {
                points[coord[1]][i]++;
            }
            //  console.log(points[coord[0]]);
        }
        else {
            if (part2) {
                // console.log("Issa Diagonal!");

                // console.log("Start coords are ", coord);
                // console.log("End coords are ", endCoords[index]);

                // Start with the lower x value.  Makes life easier.
                if (coord[0] < endCoords[index][0]) {
                    startX = coord[0];
                    endX = endCoords[index][0];
                    // console.log("Start X is: " + start + " | End X is : ", end);
                    // console.log("Start Y is: " + coord[1] + " | End Y is : ", endCoords[index][1]);
                    startY = coord[1];

                    // If the starting Y is lower than the ending Y, we are going upwards
                    if (startY < endCoords[index][1]){
                        upwards = true;
                    }
                    else {
                        upwards = false;
                    }            
                }
                else {
                    startX = endCoords[index][0];    
                    endX = coord[0];
                    // console.log("Start X is: " + start + " | End X is : ", end);
                    // console.log("Start Y is: " + endCoords[index][1] + " | End Y is : ", coord[1]);
                    startY = endCoords[index][1];

                    // If the starting Y is lower than the ending Y, we are going upwards
                    if (startY < coord[1]){
                        upwards = true;
                        // console.log("We are going up!")
                    }
                    else {
                        upwards = false;
                        // console.log("We are going down!")
                    }            
                }       
                
                // Mark the point in the points array
                for (var i = startX, d = 0; i <= endX; i++, d++) {
                    if (upwards)
                        points[startY+d][i]++;
                    else   
                        points[startY-d][i]++;

                }
            }
        }
    });
    // printGrid();
    points.forEach(line => {
        answer += line.filter(num => num > 1).length;
    });
    return answer;
}

function printGrid() {
    points.forEach(line => {
        console.log(line.toString());
    });
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