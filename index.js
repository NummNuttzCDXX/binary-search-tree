// Data Structures: Binary Search Tree (BST)
/*
	Start: 8/19/23
	End:
*/

/**
 * Binary Search Tree class
 */
class Tree {
	/**
	 * Build a Binary Search Tree with `Array` of values
	 * @param {Array} arr - Array of values to build tree
	 */
	constructor(arr) {
		this.root = buildTree(arr, 0, arr.length - 1);
	}
}

/**
 * Build a Binary Search Tree with the given
 * array of data. Array should be sorted
 *
 * @param {Array} arr - Array of data
 * @param {number | string} start - Start index of Array
 * @param {number | string} end - End index of Array
 *
 * @return {Node} `Node` Object
 */
const buildTree = (arr, start = 0, end = arr.length) => {
	// Base Case
	if (start > end) return null;

	// Get middle element
	const mid = parseInt((start + end) / 2);
	const node = new Node(arr[mid]);

	/* Recursively construct left subtree and
	make it left child of `node` */
	node.left = buildTree(arr, start, mid - 1);
	/* Recursively construct right subtree and
	make it the right child of `node` */
	node.right = buildTree(arr, mid + 1, end);

	return node;
};

/**
 * Node class constructor
 */
class Node {
	/**
	 * Node will hold `value` in the Binary Search Tree.
	 * Will have `left` and `right` attributes for Nodes children in tree
	 * @param {number | any} value - Value `Node` will hold
	 */
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

// Print tree to console
// Given by TOP
const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};

// Tests
// Unsorted Array
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tree = new Tree(sorted);
prettyPrint(tree.root);
