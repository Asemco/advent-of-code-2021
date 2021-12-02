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

var data = []; // Fill before running
var count = 0;
var start = 0;

start = data[0]; 
count = 0; 

for (var i = 0; i < data.length; i++) { if (start < data[i]){ count++; } start = data[i]; } 

// Too lazy to figure out why we needed a +1, but +1.
console.log(count+1);