const path = require('path');
const fs = require('fs');

function getInput(dayPath, fileName = "input.txt") {
    return fs
        .readFileSync(path.join(__dirname, dayPath, fileName), 'utf8')
        .toString()
        .trim()
        .split('\n')
    	.map((txt) => txt.replace("\r", ""));
}

function getTestInput(dayPath, fileName = "tinput.txt") {
    return fs
        .readFileSync(path.join(__dirname, dayPath, fileName), 'utf8')
        .toString()
        .trim()
        .split('\n')
    	.map((txt) => txt.replace("\r", ""));
}

module.exports = {
    getInput,
    getTestInput
};