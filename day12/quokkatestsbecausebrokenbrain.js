var test = new Set();

var t1 = "1, 2";
var t2 = "1, 2, 3";
var t3 = "2, 1";
var t4 = "1, 2";
var t5 = "1, 2, 3";

var a2 = {test: true, test2: false, test3: new Set([1, 2, 3])}

var a3 = Object.assign([], a2);

var j1 = {test: true, test2: false};
console.log(typeof(j1))
var hold = new Array(j1);

var hold = Object.entries(j1)

var h2 = hold.filter(h => {
    h
})


console.log(h2);
// console.log(...[j1].filter(h => {
//     console.log(h.test)
//     console.log("beep")
// }))
console.log([JSON.parse(JSON.stringify(j1))])

console.log(hold);
console.log(hold.filter(h => {
    1 != 2
}));

a3.test2 = true;
a3.test3.add(4)

console.log(a2);
console.log(a3);

console.log(t5.search("end"))
test.add(t1);
test.add(t2);
test.add(t3);
test.add(t4);
test.add(t5);

// test.add(2);
// test.add(3);

[...test].map(x => console.log(x));
test.forEach(x => {
    console.log(x);
});

