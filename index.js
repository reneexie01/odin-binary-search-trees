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

const example = mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const exampleUniqueSorted = sortedUniqueArray(example)
//console.log(exampleUniqueSorted);

const bst = buildTree(exampleUniqueSorted);

prettyPrint(bst)

//levelOrder(bst, logger);
inOrder(bst, logger)

