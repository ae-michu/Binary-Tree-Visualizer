//convert node-parent array to hierarchy
function convertToHierarchy(treeArray){
    const hierarchy = d3.stratify()
        .id(function(d) { return d.name; })
        .parentId(function(d) { return d.parent; })
        (treeArray);
    return hierarchy;
}

//create link path
function linkPath(d){
    return "M" + d.source.x + "," + (d.source.y + 20) + 
        " L " + d.target.x + "," + (d.target.y - 20);
}

//create / initialize a tree
function createTree(treeData) {
    //get container dimensions
    const container = document.getElementsByClassName("graph-container");
    const containerHeight = container[0].getBoundingClientRect().height;  
    const containerWidth = container[0].getBoundingClientRect().width;

    //convert given data to hierarchy
    const data = convertToHierarchy(treeData);

    //create svg element where graph will be drawn
    const svg = d3.select("#graph").append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", "translate(0, 50)");

    //create tree structure
    const treeStruct = d3.tree()
        .size([containerWidth, containerHeight - 100]);

    //create nodes and links data
    const elements = treeStruct(data);

    //draw links
    const links = svg.append("g").selectAll("path")
        .data(elements.links());

    links.enter().append("path")
        .attr("d", function(d){ return linkPath(d); });

    //draw nodes
    const nodes = svg.append("g").selectAll("circle")
        .data(elements.descendants());

    nodes.enter().append("circle")
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .attr("r", 20)
        .attr("data", function(d){ return d.data.name; });

    //draw names
    const names = svg.append("g").selectAll("text")
        .data(elements.descendants());

    names.enter().append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return (d.y - 3); })
        .attr("dy", "12px")
        .attr("text-anchor", "middle")
        .text(function(d){ return d.data.name; });
}

function updateTree(treeData){
    //get container dimensions
    const container = document.getElementsByClassName("graph-container");
    const containerHeight = container[0].getBoundingClientRect().height;  
    const containerWidth = container[0].getBoundingClientRect().width;

    //convert given data to hierarchy
    const data = convertToHierarchy(treeData);

    //select svg element
    const svg = d3.select("svg g");

    //create tree structure
    const treeStruct = d3.tree()
        .size([containerWidth, containerHeight - 100]);

    //create nodes and links data
    const elements = treeStruct(data);

    //select nodes, links and names
    const links = svg.selectAll("path")
        .data(elements.links());

    const nodes = svg.selectAll("circle")
        .data(elements.descendants());

    const names = svg.selectAll("text")
        .data(elements.descendants());
    
    //delete unwanted nodes, links and names
    links.exit().remove();
    nodes.exit().remove();
    names.exit().remove();

    //move nodes, links and names to new positions
    links.transition()
        .attr("d", function(d){ return linkPath(d); });

    nodes.transition()
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .attr("data", function(d){ return d.data.name; });

    names.transition()
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return (d.y - 3); })
        .text(function(d){ return d.data.name; });

    //create new nodes, links and names
    links.enter().append("path")
        .attr("d", function(d){ return linkPath(d); });

    nodes.enter().append("circle")
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .attr("r", 20)
        .attr("data", function(d){ return d.data.name; });

    names.enter().append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return (d.y - 3); })
        .attr("dy", "12px")
        .attr("text-anchor", "middle")
        .text(function(d){ return d.data.name; });
}