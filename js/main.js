//create classes for nodes and tree
class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
        this.parent = null
    }
}

class BinaryTree {
    constructor() {
        this.root = null
    }

    //function for adding nodes
    add(value) {
        const node = new Node(value);

        //if a root node doesn't exist, add new node as root
        if (this.root === null) {
            this.root = node;
            node.parent = "";
            return this;
        }

        //find leaf and add the node
        let current = this.root;
        while (current) {
            if (value === current.value) {
                return undefined;
            }

            if (value < current.value) {
                if (current.left === null) {
                    current.left = node;
                    node.parent = current.value;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = node;
                    node.parent = current.value;
                    return this;
                }
                current = current.right;
            }
        }
    }
}

//convert tree structure to array for visualization
function convertToArray(tree) {
    let array = [];

    function traversPostorder(node) {
        if (node === null) {
            return;
        }
    
        traversPostorder(node.left);
        traversPostorder(node.right);
        array.push({"name": node.value, "parent": node.parent});
    }

    traversPostorder(tree.root);
    return array;
}

//create tree data
let tree = new BinaryTree;

//add default nodes
const defaults = [10, 5, 15, 3, 7, 11, 20, 2, 4, 21];
defaults.forEach((element) => {
    const newNode = tree.add(element);
});

//create tree visualization
createTree(convertToArray(tree));

//resize the tree when window dimensions change
window.addEventListener("resize", function(){
    const treeSvg = document.querySelector('#graph>svg');
    treeSvg.remove();
    createTree(convertToArray(tree));
});

//check and allow only for numerical input inside buttons
document.querySelectorAll('input').forEach((element) => {
    element.addEventListener("input", () => {
        if (isNaN(element.value) === true || element.value.substring(element.value.length - 1, element.value.length) === " "){
            element.value = element.value.substring(0, element.value.length - 1);
        }
    });
});

//add value to tree
function addToTree(treeData) {
    input = document.querySelector('#add-value');
    if (convertToArray(treeData).length === 0){
        const newNode = treeData.add(Number(input.value));
        createTree(convertToArray(tree));
    } else {
        const newNode = treeData.add(Number(input.value));
        updateTree(convertToArray(tree));
    }
}

//add "click" function to all buttons
document.querySelectorAll(".button > div").forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.id) {
            case "add-button":
                addToTree(tree);
                break;
            case "del-button":
                console.log("del button pressed");
                break;
            case "find-button":
                console.log("find button pressed");
                break;
            case "balance-button":
                console.log("balance button pressed");
                break;
            case "state-button":
                console.log("state button pressed");
                break;
        }
    });
});