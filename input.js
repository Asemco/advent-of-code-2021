const path = require('path');
const fs = require('fs');

function getInput(dayPath) {
    return fs
        .readFileSync(path.join(__dirname, dayPath, "input.txt"), 'utf8')
        .toString()
        .trim()
        .split('\n')
    	.map((txt) => txt.replace("\r", ""));
}

module.exports = {
    getInput
};