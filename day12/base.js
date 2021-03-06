const { getInput, getTestInput, clone, getSetDifference } = require('../util');

var tdata = getTestInput("day12"); // Update with correct day
var tdata2 = getTestInput("day12", 'tinput2.txt'); // Update with correct day
var tdata3 = getTestInput("day12", 'tinput3.txt'); // Update with correct day
var rdata = getInput("day12"); // Update with correct day
var tdata2answer = getTestInput("day12", 'ainput.txt');
var answer = 0;
var nodes = [];
var paths = new Set();
var tdata2Paths = new Set();
var baseNode = {
    name: "",
    adjacent: new Set(),
    small: false,
    visited: false,
    start: false,
    end: false
};
var baseVisited = {};


function logData() {
    console.log(nodes);
    nodes.map(n => console.log(n.name, n.adjacent));
    // console.log(baseVisited);
}

function clearData() {
    paths = new Set();
    nodes = [];
    answer = 0;
}

function cloneNode() {
    var tempNode = clone(baseNode);
    tempNode.adjacent = new Set();
    return tempNode;
}

function parseData(data) {
    data.forEach(line => {
        var tempNode = cloneNode();
        var sides = line.split("-");
        // console.log("Sides: ", sides);
        if (nodes.filter(node => node.name == sides[0]).length == 0) {
            tempNode.name = sides[0];
            if (sides[1] != "start") tempNode.adjacent.add(sides[1]);
            if (tempNode.name.toLowerCase() == tempNode.name) { // It's a Lowercase
                tempNode.small = true;
            }
            if (tempNode.name == "start") {
                tempNode.start = true;
            }
            if (tempNode.name == "end") {
                tempNode.end = true;
            }
            baseVisited[tempNode.name] = 0;
            nodes.push(tempNode);
            // console.log("Adding in:", tempNode);
        }
        else {
            nodes.filter(node => node.name == sides[0])[0].adjacent.add(sides[1]);
        }

        
        tempNode = cloneNode();
        
        if (nodes.filter(node => node.name == sides[1]).length == 0) {
            tempNode.name = sides[1];
            if (sides[0] != "start") tempNode.adjacent.add(sides[0]);
            if (tempNode.name.toLowerCase() == tempNode.name) { // It's a Lowercase
                tempNode.small = true;
            }
            if (tempNode.name == "start") {
                tempNode.start = true;
            }
            if (tempNode.name == "end") {
                tempNode.end = true;
            }
            baseVisited[tempNode.name] = 0;
            nodes.push(tempNode);
            // console.log("Adding in:", tempNode);
        }
        else {
            nodes.filter(node => node.name == sides[1])[0].adjacent.add(sides[0]);
        }
    });

    // This is for parsing the results from alan.  Big TY for the help - Quickly finding which paths were incorrect was insanely helpful in fixing the issue.
    tdata2answer.forEach(path => {
        tdata2Paths.add(path);
    })
}

function dropBadNodes() {
    // If 2 small nodes are connected with no large nodes, we don't need it in our life.
    // EDIT: For part 1.

    nodes.forEach(node => {
        // If the current node is small, check the adjacent nodes
        if (node.small && node.name != "end") {
            node.adjacent.forEach(adj => {
                // if (node.name == "zg") console.log("ADJ is: " + adj + "| Final Node is ", node);
                // If the adjacent node is a small, check it's adjacent nodes one more time
                var adjNode = nodes.filter(n => n.name == adj)[0];
                // if (node.name == "zg") console.log(adjNode);
                if (adjNode) {
                    if (adjNode.small) {
                        
                        // If the adjacent node does not have any large nodes, or the end node, drop it.
                        if ([...adjNode.adjacent].filter(n => n.toUpperCase() == n || n == "end").length == 0) {
                            node.adjacent.delete(adj);
                            var newNodes = nodes.filter(n => n.name != adj)
                            // console.log("Should be missing the D",newNodes); // Should be missing the D
                            nodes = newNodes;
                        }
                        
                    }
                }
            })
        }
    });

}

function highestVisited(path) {
    var t2 = path.split(",");
   
    // Remove start and the empty string (or end) from the end
    t2.pop()
    t2.shift()
    // Isolate lowercase strings
    t2 = t2.filter(s => s == s.toLowerCase())
    // Create set from lower case strings
    var strSet = new Set(t2);
    return (t2.length - strSet.size) >= 1;
}

function travelTheLands(path, name, visited) {

    var before = 0;
    var after = 0;
    // Get the node with the current name
    var node = nodes.filter(n => n.name == name)[0];
    if (node) {
        if (node.name == "start") {
            return;
        }
        // If we've already visited this small node, we need to get out of here
        if (node.small && visited[node.name] > 0 ) {
            // console.log("Smol visited node is:", node);

            // If the end node is adjacent, we can mark it down on the way out
            if ([...node.adjacent].filter(adj => adj == "end").length > 0) {
                
                path += "end,";

                before = paths.size;
                paths.add(path);
                after = paths.size;
                // if (before < after) console.log("Added a path! Current Paths: " + paths.size + " | Path Length: " + path.length, path);
            }
            return;
        }

        path += node.name + ",";
        visited[node.name]++;
        
        if (node.name == "end") {

            // Remove the comma from the end of the path.  It's just better looking.
            
            // If we've reached the end, we need to get out of here.
            before = paths.size;
            paths.add(path);
            after = paths.size;
            // if (before < after) console.log("Added a path! Current Paths: " + paths.size + " | Path Length: " + path.length, path);
            return;
        }

        // console.log(node);
        [...node.adjacent].forEach(adjNode => {
            // console.log("Currently on Node: " + name + " | Heading into Node: " + adjNode + " | Visited Like: ", visited);
            var node = nodes.filter(n => n.name == adjNode)[0];
                travelTheLands(path, adjNode, Object.assign({}, visited));
        });
    }

    // If we've reached here we can just leave
    return;
}

function travelTheLands2(path, name, visited) {

    // Purely for debugging purposes
    var before = 0;
    var after = 0;

    // Get the node with the current name
    var node = nodes.filter(n => n.name == name)[0];
    if (node) {
        
        if (node.name == "start") {
            return;
        }

        // We've visited too much in this route
        if (visited[node.name] >= 2 && node.small) {
            return;
        }

        // If we've already visited this small node, we need to get out of here
        if (node.small && visited[node.name] > 0 && highestVisited(path) ) {
            // console.log("Current Path: ", path);
            // console.log("Smol visited node is:", node);

            // If the end node is adjacent, we can mark it down on the way out
            if ([...node.adjacent].filter(adj => adj == "end").length > 0) {
                path += node.name + ",";
                path += "end";
                before = paths.size;
                // We only want to leave if this last node has only appeared twice or less in the path.
                if (occurrences(path, node.name, true) < 2) {
                    paths.add(path);
                }
                after = paths.size;
                // if (before < after) console.log("Added a small end path! Current Paths: " + paths.size + " | Path Length: " + path.length, path);
            }
            return;
        }

        path += node.name + ",";
        visited[node.name]++;
        
        if (node.name == "end") {
            // If we've reached the end, we need to get out of here.
            // Remove the comma from the end of the path.  It's just better looking.
            path = path.slice(0, -1);

            before = paths.size;
            paths.add(path);
            after = paths.size;

            // if (before < after) console.log("Added an end path! Current Paths: " + paths.size + " | Path Length: " + path.length, path);
            return;
        }

        // Do it all again for each adjacent node.  Eventuall we'll reach the end, a dead end or a small node that can reach the end with our max visit criteria.
        [...node.adjacent].forEach(adjNode => {
            // console.log("Currently on Node: " + name + " | Heading into Node: " + adjNode + " | Visited Like: ", visited);
            var node = nodes.filter(n => n.name == adjNode)[0];
            if (!node.small || (node.small && visited[adjNode] < 2)) {
                travelTheLands2(path, adjNode, Object.assign({}, visited));
            }
        });
    }

    // If we've reached here we can just leave
    return;
}

function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function solve(part2 = false) {
    if (!part2) {
        var startingNode = nodes.filter(node => node.name == "start")[0];

        // Get each adjacent node to the starting node
        [...startingNode.adjacent].forEach(startAdjName => {
            var visited = clone(baseVisited);
            visited["start"]++;
            var path = "start,";
            travelTheLands(path, startAdjName, Object.assign({}, visited));
        });

        answer = paths.size;
    }
    else {
        var startingNode = nodes.filter(node => node.name == "start")[0];

        // Get each adjacent node to the starting node
        [...startingNode.adjacent].forEach(startAdjName => {
            var visited = clone(baseVisited);
            visited["start"]++;
            var path = "start,";
            travelTheLands2(path, startAdjName, Object.assign({}, visited));
        });

        // console.log("Difference of Mine over Alan", getSetDifference(paths, tdata2Paths));
        // console.log("Difference of Alan over Mine", getSetDifference(tdata2Paths, paths));

        answer = paths.size;
    }
    
    return answer;
}

function part1(data) {
    clearData();
    
    parseData(data);
    // logData();
    dropBadNodes();
    // logData();
    
    return solve();
}

function part2(data) {
    clearData();
    
    parseData(data);
    // dropBadNodes();
    // logData();

    return solve(true);
}

// console.log("The answer for Part 1 Test is:", part1(tdata));

// console.log("The answer for Part 1 Test 2 is:", part1(tdata2));

// console.log("The answer for Part 1 Test 3 is:", part1(tdata3));

// console.log("The answer for Part 2 Test is:", part2(tdata));

// console.log("The answer for Part 2 Test 2 is:", part2(tdata2));

// console.log("The answer for Part 2 Test 3 is:", part2(tdata3));

// console.log("The answer for Part 1 is:", part1(rdata));

// console.log("The answer for Part 2 is:", part2(rdata));