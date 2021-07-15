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

    //function for deleting nodes
    delete(value) {
        let current = this.root;
        let currentParent;

        //find the node
        while (current.value !== value) {
            if (current === null) {
                return undefined;
            }

            if (value > current.value) {
                currentParent = current;
                current = current.right;
            }

            if (current === null) {
                return undefined;
            }

            if (value < current.value) {
                currentParent = current;
                current = current.left;
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
    }

    async find(value) {
        let current = this.root;
        await blinkNode(current.value, 500, "#38438B");

        while (current.value !== value) {
            if (current === null) {
                return undefined;
            }else if (value < current.value) {
                current = current.left;
            }else if (value > current.value) {
                current = current.right;
            }
            await blinkNode(current.value, 500, "#38438B");
        }

        blinkNode(current.value, 2000, "#4C975C");
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
                console.log("balance button pressed");
                break;
            case "state-button":
                console.log("state button pressed");
                break;
        }
    });
});