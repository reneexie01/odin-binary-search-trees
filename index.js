class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }
}

function buildTree(arr) {
    return buildTreeRecursion(arr, 0, (arr.length - 1));
}

function buildTreeRecursion(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(arr[mid]);

    root.left = buildTreeRecursion(arr, start, mid - 1);
    root.right = buildTreeRecursion(arr, mid + 1, end)

    return root;
}

function insertion(root, key) {
    if (root === null) {
        return new Node(key);
    }

    if (root.data === key) {
        return root;
    }

    if (root.data > key) {
        root.left = insertion(root.left, key);
    } else if (root.data < key) {
        root.right = insertion(root.right, key);
    }

    return root;
}

function deletion(root, key) {
    if (root === null) {
        return root;
    }

    if (root.data > key) {
        root.left = deletion(root.left, key);
    } else if (root.data < key) {
        root.right = deletion(root.right, key);
    } else { // When root.data === key
        if (root.left === null) {
            return root.right;
        }
        if (root.right === null) {
            return root.left;
        }

        let successor = getSuccessor(root);
        root.data = successor.data;
        root.right = deletion(root.right, successor.data);
    }
    return root;
}

function getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
        node = node.left;
    }
    return node;
}

function find(root, value) {
    if (root === null || root.data === value) return root;

    if (root.data > value) {
        return find(root.left, value);
    }

    if (root.data < value) {
        return find(root.right, value);
    }
}

function levelOrder(root, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }

    if (root === null) return;

    const queue = [];

    queue.push(root);

    while (queue.length > 0) {
        const node = queue.shift();
        callback(node);

        if (node.left !== null) {
            queue.push(node.left);
        }

        if (node.right !== null) {
            queue.push(node.right);
        }
    }

}

function inOrder(root, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }

    if (root === null) return;

    inOrder(root.left, callback);
    callback(root);
    inOrder(root.right, callback);
}

function logger(item) {
    console.log(item);
}

function postOrder(root, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }
    
    if (root === null) return;

    postOrder(root.left, callback);
    postOrder(root.right, callback);
    callback(root);
}

function preOrder(root, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }
    
    if (root === null) return;

    callback(root);
    preOrder(root.left, callback);
    preOrder(root.right, callback);

}

function height(root) {
    if (root === null) {
        return 0;
    } else {
        let rootLeft = height(root.left);
        let rootRight = height(root.right);
        if (rootLeft > rootRight) {
            return rootLeft + 1;
        } else {
            return rootRight + 1;
        }
    }
}

function depth(root, node) {
    if (root === null) return null;

    if (root.data === node) return 1;

    if (root.data > node) {
        let counter = depth(root.left, node);
        return counter + 1;
    }

    if (root.data < node) {
        let counter = depth(root.right, node);
        return counter + 1;
    }
}

function isBalanced(root) {
    if (root === null) {
        return true;
    }
    
    let leftRoot = height(root.left);
    let rightRoot = height(root.right);

    const difference = Math.abs(leftRoot - rightRoot);
    return (difference > 1) ? false : true;
    
}

function rebalance(root) {
    let array = inOrderArray(root);
    console.log(array)
    return buildTree(array);
}

function inOrderArray(root, arr = []) {
    if (root === null) return null;

    inOrderArray(root.left, arr)
    arr.push(root.data);
    inOrderArray(root.right, arr);

    return arr;
}

/* BST visualiser */
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

/* Sorting and removing duplicates */ 
function merge(left, right) {
    let sortedArr = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
    }
    return [...sortedArr, ...left, ...right]
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);

    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid))

    return merge(left, right);
}


function sortedUniqueArray(arr) {
    const sortedArray = mergeSort(arr);
    const newSet = new Set(sortedArray);
    const newArray = [...newSet]
    return newArray;
}

/* Alternate method of getting unique elements from array
function removeDuplicates(arr) {
    let hashmap = {};
    let uniqueArr = [];

    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];

        if (!hashmap[element]) {
            hashmap[element] = true;
            uniqueArr.push(element);
        }
    }

    return uniqueArr;
}
*/



// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.

Math.floor(Math.random() * 100);

function createNewArray() {
    let array = [];
    while (array.length < 11) {
        const number = Math.floor(Math.random() * 100);
        array.push(number);
    }
    return array;
}

const newArray = createNewArray();
const sortedArray = sortedUniqueArray(newArray)

const newTree = buildTree(sortedArray);
prettyPrint(newTree);

// 2. Confirm that the tree is balanced by calling isBalanced.

console.log(isBalanced(newTree));

// 3. Print out all elements in level, pre, post, and in order.

// levelOrder(newTree, logger);
// preOrder(newTree, logger);
// postOrder(newTree, logger);
 inOrder(newTree, logger)

 // 4. Unbalance the tree by adding several numbers > 100.

 newTree.right.right.right = new Node(101);
 newTree.right.right.right.right = new Node(102);
 newTree.right.right.right.right.right = new Node(103);
 newTree.right.right.right.right.right.right = new Node(104);
 
 prettyPrint(newTree)

 // 5. Confirm that the tree is unbalanced by calling isBalanced.

 console.log(isBalanced(newTree));

 // 6. Balance the tree by calling rebalance.

 const rebalancedTree = rebalance(newTree);
 prettyPrint(rebalancedTree);

 // 7. Confirm that the tree is balanced by calling isBalanced.

 console.log(isBalanced(rebalancedTree));

 // 8. Print out all elements in level, pre, post, and in order.

 // levelOrder(rebalancedTree, logger);
 // preOrder(rebalancedTree, logger);
 // postOrder(rebalancedTree, logger);
 inOrder(rebalancedTree, logger);