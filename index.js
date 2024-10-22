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
 
const example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const cleanedExample = cleanArray(example);

console.log(cleanedExample)
const root = buildTree(cleanedExample, 0, cleanedExample.length - 1)
console.log(root)
console.log(prettyPrint(root));