/* Classes */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}

/* Functions to build the tree */

function buildTree(array, start, end) {

    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
}

function cleanArray(array) {
   const sortedArray = mergeSort(array);
   const uniqueSortedArray = removeDuplicates(sortedArray);
   return uniqueSortedArray;
}

function merge(left, right) {
    let sortedArray = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArray.push(left.shift());
        } else {
            sortedArray.push(right.shift())
        }
    }

    return [...sortedArray, ...left, ...right]
}

function removeDuplicates(array) {
    let hashmap = {};
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        let element = array[i];

        if (!hashmap[element]) {
            hashmap[element] = true;
            newArray.push(element)
        }
    }

    return newArray;
}

function mergeSort(array) {
    if (array.length <= 1) return array;

    let mid = Math.floor(array.length / 2);

    let left = mergeSort(array.slice(0, mid))
    let right = mergeSort(array.slice(mid))

    return merge(left, right)
}

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
 
function insert(root, key) {
    if (root === null) {
        return new Node(key);
    }

    if (root.data === key) {
        return root;
    }

    if (root.data > key) {
        root.left = insert(root.left, key)
    } else if (root.data < key) {
        root.right = insert(root.right, key)
    }

    return root;
}

function remove(root, key) {
    if (root === null) {
        return root;
    }

    if (root.data > key) {
        root.left = remove(root.left, key)
    } else if (root.data < key) {
        root.right = remove(root.right, key)
    } else { // This is when root.data === key
        if (root.left === null) {
            return root.right;
        }
        if (root.right === null) {
            return root.left;
        }
        let successor = getSuccessor(root)
        root.data = successor.data
        root.right = remove(root.right, successor.data)
    }
    return root;
}

function getSuccessor(current) {
    current = current.right;
    while (current !== null && current.left !== null) {
        current = current.left;
    }
    return current;
}

function find(root, value) {
    if (root === null) {
        return root;
    }

    if (root.data > value) {
        return root.left = find(root.left, value);
    } else if (root.data < value) {
        return root.right = find(root.right, value)
    } else {
        return root;
    }
}


const example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const cleanedExample = cleanArray(example);

console.log(cleanedExample)
let root = buildTree(cleanedExample, 0, cleanedExample.length - 1)
console.log(root)
prettyPrint(root);

insert(root, 10);
prettyPrint(root);

remove(root, 67);
prettyPrint(root);

console.log(find(root, 10));