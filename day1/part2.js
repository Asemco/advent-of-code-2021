var testData = [199,
200,
208,
210,
200,
207,
240,
269,
260,
263];

var data = [];
var count = 0;
var start = 0;
var windows = [];

windows = []; for (var d = 0; d < data.length; d++) {
    if (d+3 > data.length) break;
    windows.push((data[d]+data[d+1]+data[d+2]));
}
console.log(windows)
data = windows;
start = data[0]; count = 0; for (var i = 0; i < data.length; i++) { if (start < data[i]){ count++; } start = data[i]; } console.log(count)