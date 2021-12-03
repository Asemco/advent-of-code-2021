/* Test Code */

var tdata = ["forward 5",
"down 5",
"forward 8",
"up 3",
"down 8",
"forward 2"
];

var tdataUsable = tdata.map( (d) => { return d.split(" ")});

var x = 0; var y = 0; var a = 0;
tdataUsable.forEach( (d) => { 
    if (d[0] == "forward") {x+=parseInt(d[1]); y += a * parseInt(d[1]) }
    if (d[0] == "up") a-=parseInt(d[1]); 
    if (d[0] == "down") a+=parseInt(d[1]); 
}); 
console.log ("x: " + x + " * y: " + y + " = " + x * y); // Answer

/* Real Code */

var data = []; // Fill before running

var dataUsable = data.map( (d) => { return d.split(" ")});

var x = 0; var y = 0; var a = 0;
dataUsable.forEach( (d) => { 
    if (d[0] == "forward") {x+=parseInt(d[1]); y += a * parseInt(d[1]) }
    if (d[0] == "up") a-=parseInt(d[1]); 
    if (d[0] == "down") a+=parseInt(d[1]);  
}); 
console.log ("x: " + x + " * y: " + y + " = " + x * y); // Answer