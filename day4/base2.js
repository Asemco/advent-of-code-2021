const { getInput, getTestInput } = require('../input');

var tdata = getTestInput("day4"); // Update with correct day
var rdata = getInput("day4"); // Update with correct day
var adata = getInput("day4", "ainput.txt"); // Update with correct day

var answer = 0;
var calledNumbers = [];
var boards = [];
var boardSum = [];
var wonner = [];

function logData() {
    console.log("CalledNumbers: ", calledNumbers);
    console.log("Boards: ", boards);
    console.log("Board Sum: ", boardSum);
}

function clearData() {
    answer = 0;
    calledNumbers = [];
    boards = [];
    boardSum = [];
    wonner = [];
}

function parseData(data) {
    // Separate called numbers
    var numbers = data[0];
    numbers.split(',').forEach( (num) => calledNumbers.push(parseInt(num)));
    var miniboard = [];
    var miniboardSum = 0;
    // Separate boards
    for (var i = 2; i < data.length; i++) {
        if (data[i].length == 0 || i == data.length - 1) {
            if (i == data.length - 1) {
                // Separate all numbers
                var separated = data[i].split(" ").filter((num) => num != "").map( num => parseInt(num)); 
                miniboard.push(separated);
                separated.forEach( num => miniboardSum+= parseInt(num));
            }
            boards.push(miniboard);
            boardSum.push(miniboardSum);
            miniboard = [];
            miniboardSum = 0;
        }
        else {
            // Separate all numbers
            var separated = data[i].split(" ").filter((num) => num != "").map( num => parseInt(num)); 
            miniboard.push(separated);
            separated.forEach( num => miniboardSum+= parseInt(num));
        }
    }
}

function solvePart2() {
    for (var i = 0 ; i < calledNumbers.length; i ++) {
        boards.forEach((board, index) => {
            for (let d = 0; d < board.length; d++) {
                const row = board[d];
                if (row.indexOf(calledNumbers[i]) != -1) { // Number is found 
                    // console.log(calledNumbers[i] + " found on board " + index + " on row " + d + " in Index " + row.indexOf(calledNumbers[i]));
                    boardSum[index] -= calledNumbers[i];
                    board[d][row.indexOf(calledNumbers[i])] = -1;
                }    
            }
            // console.log(board);
        });

        answer = checkWinner(calledNumbers[i]);
        // console.log("Answer: " + answer + " | wonners.length: " + wonner.length + " | boards.length: ", boards.length);
        var totalWinners = wonner.filter( w => true);
        if (totalWinners == boards.length) {
            return answer;
        }

    }
    return answer;
}

function solvePart1() {
    for (var i = 0 ; i < calledNumbers.length; i ++) {
        boards.forEach((board, index) => {
            for (let d = 0; d < board.length; d++) {
                const row = board[d];
                if (row.indexOf(calledNumbers[i]) != -1) { // Number is found 
                    // console.log(calledNumbers[i] + " found on board " + index + " on row " + d + " in Index " + row.indexOf(calledNumbers[i]));
                    boardSum[index] -= calledNumbers[i];
                    board[d][row.indexOf(calledNumbers[i])] = -1;
                }    
            }
            // console.log(board);
        });

        answer = checkWinner(calledNumbers[i]);
        if (wonner.length > 0) { // We found a winner
            // console.log("Winning number: ", calledNumbers[i]);
            // console.log("Winning board: ", calledNumbers[i]);
            return answer;
        }

    }
    return answer;
}

function checkWinner(lastNumber) {
    boards.forEach((board, index) => {
        for (var i = 0; i < board.length; i++) {
            var row = board[i];
            // See if horizontal wins
            if (row.filter(nums => nums == -1).length == 5 && !wonner[index])  {
                console.log("Index: " + index + " | Winning Number: " + lastNumber, board);
                answer = boardSum[index] * lastNumber;
                wonner[index] = true;
                break;
            }
            // See if vertical wins
            if (board[0][i] + board[1][i] + board[2][i] + board[3][i] + board[4][i] == -5 && !wonner[index]) {
                console.log("Index: " + index + " | Winning Number: " + lastNumber, board);
                answer = boardSum[index] * lastNumber;
                wonner[index] = true;
                break;
            }
        }
    })
    return answer;
}

function part1(data) {
    clearData();
    
    parseData(data);
    // logData();

    answer = solvePart1();

    return answer;
}

function part2(data) {
    clearData();

    parseData(data);
    // logData();

    answer = solvePart2();

    return answer;
}

console.log("The answer for Part 1 Test is:", part1(tdata));

// console.log("The answer for Part 2 Test is:", part2(tdata));

// console.log("The answer for Part 1 is:", part1(rdata));

// console.log("The answer for Part 2 is:", part2(rdata));

// console.log("The answer for Part 1 is:", part1(adata));

// console.log("The answer for Part 2 is:", part2(adata));