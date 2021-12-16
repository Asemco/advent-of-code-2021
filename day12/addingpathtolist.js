if (node.small && visited[node.name] > (maxVisits-1) ) {
    // console.log("Smol visited node is:", node);
    // If the end node is adjacent, we can mark it down on the way out
    if ([...node.adjacent].filter(adj => adj == "end").length > (maxVisits-1)) {
        path += "end, ";
        before = paths.size;
        paths.add(path);
        after = paths.size;
        if (before < after) console.log("Added a path! Current Paths: " + paths.size + " | Path Length: " + path.length, path);
    }
    return;
}
