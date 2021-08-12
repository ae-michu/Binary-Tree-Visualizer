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
            popUpMessage("node " + '"' + String(value) + '" added as root', "#4C975C");
            return this;
        }

        //find leaf and add the node
        let current = this.root;
        while (current) {
            if (value === current.value) {
                popUpMessage("node " + '"' + String(value) + '" already exists', "#974C4C");
                return undefined;
            }

            if (value < current.value) {
                if (current.left === null) {
                    current.left = node;
                    node.parent = current.value;
                    popUpMessage("node " + '"' + String(value) + '" added', "#4C975C");
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = node;
                    node.parent = current.value;
                    popUpMessage("node " + '"' + String(value) + '" added', "#4C975C");
                    return this;
                }
                current = current.right;
            }
        }
    }

    //function for deleting nodes
    delete(value) {
        let current = this.root;
        let currentParent;

        //find the node
        while (current.value !== value) {
            if (value > current.value) {
                currentParent = current;
                current = current.right;
            }else if (value < current.value) {
                currentParent = current;
                current = current.left;
            }

            if (current === null) {
                popUpMessage("node " + '"' + String(value) + '" not found', "#974C4C");
                return undefined;
            }
        }

        //check for children
        if (current.right === null && current.left === null) {
            //node is a leaf
            if (current.value === this.root.value) {
                this.root = null;
            }

            if (currentParent !== undefined) {
                if (current.value > currentParent.value) {
                    currentParent.right = null;
                } else {
                    currentParent.left = null;
                }
            }
            current = null;

        } else if ((current.right !== null && current.left === null) || (current.right === null && current.left !== null)) {
            //node has one child
            let child;
            if (current.right !== null) {
                child = current.right;
                current.right = null;
            } else {
                child = current.left;
                current.left = null;
            }

            if (current.value === this.root.value) {
                this.root = child;
                child.parent = "";
            }
            
            if (currentParent !== undefined) {
                if (currentParent.right.value === current.value) {
                    currentParent.right = child;
                } else {
                    currentParent.left = child;
                }
                child.parent = currentParent.value;
            }

        } else {
            //node has both children
            let successorParent;
            let target = current;
            current = current.right;

            while (current.left !== null) {
                successorParent = current;
                current = current.left;
            }

            if (current.right === null && current.left === null) {
                //leaf
                if (successorParent !== undefined) {
                    if (successorParent.left !== null && successorParent.left.value == current.value) {
                        successorParent.left = null;
                    } else {
                        successorParent.right = null;
                    }
                }

                target.value = current.value;

                if (target.left !== null) {
                    if (target.left.value === current.value) {
                        target.left = null;
                    } else {
                        target.left.parent = current.value;
                    }
                }

                if (target.right !== null) {
                    if (target.right.value === current.value) {
                        target.right = null;
                    } else {
                        target.right.parent = current.value;
                    }
                }

            } else {
                //one child (right)
                let rightChild = current.right;

                if (successorParent !== undefined) {
                    successorParent.left = rightChild;
                    rightChild.parent = successorParent.value;
                } else {
                    target.right = rightChild;
                }

                target.value = current.value;

                if (target.right !== null) {
                    target.right.parent = current.value;
                }

                if (target.left !== null) {
                    target.left.parent = current.value;
                }
            }
        }
        popUpMessage("node " + '"' + String(value) + '" deleted', "#4C975C");
    }

    //find given node and highlight path
    async find(value) {
        let current = this.root;
        await blinkNode(current.value, 500, "#38438B");

        while (current.value !== value) {
            if (value < current.value) {
                current = current.left;
            }else if (value > current.value) {
                current = current.right;
            }

            if (current !== null) {
                await blinkNode(current.value, 500, "#38438B");
            } else {
                popUpMessage("node " + '"' + String(value) + '" not found', "#974C4C");
                return undefined;
            }
        }

        blinkNode(current.value, 2000, "#4C975C");
        popUpMessage("node " + '"' + String(current.value) + '" found', "#4C975C");
    }

    //return height of the tree below given node
    checkBalance(node) {
        if (node === null) {
            return 0;
        } else {
            return Math.max(this.checkBalance(node.left), this.checkBalance(node.right)) + 1;
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

//enable animations
enableAnimations(true);

//create tree data
let tree = new BinaryTree;

//add default nodes
// const defaults = [10, 5, 15, 3, 7, 11, 20, 2, 4, 21];
const defaults = [4, 3, 5, 2, 6, 1, 7];
defaults.forEach((element) => {
    const newNode = tree.add(element);
});

//create tree visualization
createTree(convertToArray(tree));

//resize the tree when window dimensions change
window.addEventListener("resize", function(){
    const treeSvg = document.querySelector('#graph>svg');
    if (treeSvg !== null) {
        treeSvg.remove();
    }
    if (convertToArray(tree).length !== 0) {
        createTree(convertToArray(tree));
    }
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
        createTree(convertToArray(treeData));
    } else {
        const newNode = treeData.add(Number(input.value));
        updateTree(convertToArray(treeData));
    }
}

//delete value from tree
function deleteFromTree(treeData) {
    input = document.querySelector('#del-value');
    if (convertToArray(treeData).length === 1) {
        const treeSvg = document.querySelector('#graph>svg');
        treeSvg.remove();
        const deleteNode = treeData.delete(Number(input.value));
    } else {
        const deleteNode = treeData.delete(Number(input.value));
        updateTree(convertToArray(treeData));
    }
}

//find value in the tree
function findInTree(treeData) {
    input = document.querySelector('#find-value');
    const find = treeData.find(Number(input.value));
}

//check if tree is balanced
function isBalanced(treeData) {
    if (treeData.root !== null) {
        let rHeight = treeData.checkBalance(treeData.root.right);
        let lHeight = treeData.checkBalance(treeData.root.left);
        if (Math.abs(rHeight - lHeight) <= 1) {
            popUpMessage("balanced", "#4C975C");
        } else {
            popUpMessage("not balanced", "#974C4C");
        }
    } else {
        popUpMessage("no tree", "#974C4C");
    }
}

//balance the tree
function balanceTree(treeData) {
    //save tree nodes to array and delete them from tree
    let treeArrayLength = convertToArray(treeData).length;
    let treeArray = [];
    for (let i = 0; i < treeArrayLength; i++) {
        const nodeValue = convertToArray(treeData)[i].name;
        treeArray.push(nodeValue);
    }
    for (let i = 0; i < treeArrayLength; i++) {
        const deleteNode = treeData.delete(treeArray[i]);
    }
    const treeSvg = document.querySelector('#graph>svg');
    treeSvg.remove();

    //sort array in order
    treeArray.sort(function (a, b) {
        return a - b;
    });

    //balance array
    let balancedArray = [];
    halfArray(treeArray);
    function halfArray(array) {
        if (array.length > 2) {
            const midIndex = Math.floor(array.length / 2) + 1;
            balancedArray.push(array[midIndex - 1]);
            halfArray(array.slice(0, midIndex - 1));
            halfArray(array.slice(-midIndex + 1));
        } else {
            for (let i = 0; i < array.length; i++) {
                balancedArray.push(array[i]);
            }
        }
    }
    enableAnimations(true);

    //build balanced tree
    balancedArray.forEach((element) => {
        const newNode = treeData.add(element);
    });
    createTree(convertToArray(treeData));
}

//add "click" function to all buttons
document.querySelectorAll(".button > div").forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.id) {
            case "add-button":
                addToTree(tree);
                clearInput(button.id);
                break;
            case "del-button":
                deleteFromTree(tree);
                clearInput(button.id);
                break;
            case "find-button":
                findInTree(tree);
                clearInput(button.id);
                break;
            case "balance-button":
                balanceTree(tree);
                break;
            case "state-button":
                isBalanced(tree);
                break;
        }
    });
});