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

function arrayRotate(arr, reverse) {
    // Take the last element from the array (pop), and put it at the start of the array (unshift)
    if (reverse) arr.unshift(arr.pop());
    // Take the first element from the array (shift), and put it at the end of the array (push)
    else arr.push(arr.shift());
    return arr;
}

function clone(a) {
    return JSON.parse(JSON.stringify(a));
}

function getSetDifference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

module.exports = {
    getInput,
    getTestInput,
    arrayRotate,
    clone,
    getSetDifference
};