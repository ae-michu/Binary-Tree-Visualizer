//set default tree values
var treeData = [
    {"name": "1", "parent": ""},
    {"name": "2", "parent": "1"},
    {"name": "3", "parent": "1"},
    {"name": "4", "parent": "2"},
    {"name": "5", "parent": "2"},
    {"name": "6", "parent": "3"},
    {"name": "7", "parent": "3"},
    {"name": "8", "parent": "4"},
    {"name": "9", "parent": "4"},
    {"name": "10", "parent": "6"}
];

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

    //draw nodes
    const nodes = svg.append("g").selectAll("circle")
        .data(elements.descendants());

    nodes.enter().append("circle")
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .attr("r", 20);

    //draw links
    const links = svg.append("g").selectAll("path")
        .data(elements.links());

    links.enter().append("path")
        .attr("d", function(d){ return linkPath(d); });

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
    const container = document.getElementById("graph-container");
    const containerHeight = container.getBoundingClientRect().height;  
    const containerWidth = container.getBoundingClientRect().width;

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
    const nodes = svg.selectAll("circle")
        .data(elements.descendants());
    
    const links = svg.selectAll("path")
        .data(elements.links());

    const names = svg.selectAll("text")
        .data(elements.descendants());
    
    //delete unwanted nodes, links and names
    nodes.exit().remove();
    links.exit().remove();
    names.exit().remove();

    //move nodes, links and names to new positions
    nodes.transition()
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; });

    links.transition()
        .attr("d", function(d){ return linkPath(d); });

    names.transition()
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return (d.y - 3); });

    //create new nodes, links and names
    nodes.enter().append("circle")
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .attr("r", 20)

    links.enter().append("path")
        .attr("d", function(d){ return linkPath(d); });

    names.enter().append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return (d.y - 3); })
        .attr("dy", "12px")
        .attr("text-anchor", "middle")
        .text(function(d){ return d.data.name; });
}

//create a tree
createTree(treeData);

//resize the tree when window dimensions change
window.addEventListener("resize", function(){
    const treeSvg = document.querySelector('#graph>svg');
    treeSvg.remove();
    createTree(treeData);
});