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

	/**
	 * Insert a value into the tree
	 * @param {number | any} value - Value (Number) to insert
	 */
	insert = (value) => {
		// Check if Tree contains `value`
		if (this.contains(value)) return; // Dont add value twice

		let node = this.root;
		while (value > node.value) {
			if (node.right === null) node.right = new Node(value);

			else node = node.right;
		}

		while (value < node.value) {
			if (node.left === null) node.left = new Node(value);

			else node = node.left;
		}
	};

	/**
	 * Delete `value` from tree
	 * @param {number | any} value - Value to delete
	 */
	delete = (value) => {
		let node = this.root;
		let previous = this.root;
		// If value is Root
		if (value === node.value) {
			node = node.right;
			while (node.left != null) {
				previous = node;
				node = node.left;
			}

			if (previous !== this.root) {
				previous.left = node.right;
			}

			node.right = this.root.right;
			node.left = this.root.left;
			this.root = node;

			return;
		}

		while (true) {
			// If value is greater than Node
			if (value > node.value) {
				// Loop to next Node (right)
				previous = node;
				node = node.right;
			// If value is less than Node
			} else if (value < node.value) {
				// Loop to next Node (left)
				previous = node;
				node = node.left;
			// If value = Node
			} else if (value == node.value) {
				/* If prev is greater than Node AND Node has children,
				Means Nodes Right values (greater) go to
				Prev's left (less), and Node's left values (less than node)
				go to Prev's *new* left's left (less than new left) */
				// eslint-disable-next-line max-len
				if (previous.value > node.value && (node.right != null || node.left != null)) {
					previous.left = node.right;
					previous.left.left = node.left;
				/* If Prev is less than Node AND Node has children,
				Means Node's right values (greater) go to
				Prev's right (greater), and Node's left values (less than Node)
				go to Prev's *new* right's left (less than new right) */
				// eslint-disable-next-line max-len
				} else if (previous.value < node.value && (node.right != null || node.left != null)) {
					previous.right = node.right;
					previous.right.left = node.left;
				/* Else, Node doesn't have children,
				For some reason doesn't work if Node's children = `null` so
				I have to check and do it differently */
				} else {
					/* If Prev is less than Node AND both Node's children are null,
					Set Prev's right to null (delete Node) */
					if (previous.value < node.value &&
					node.right == null && node.left == null) {
						previous.right = null; // Delete `Node`
					/* If Prev is *greater* than Node AND both Node's children are null
					Set Prev's left to null (delete Node) */
					} else if (previous.value > node.value &&
					node.right == null && node.left == null) {
						previous.left = null; // Delete `Node`
					/* If Prev is *greater* than Node AND Right child is null */
					} else if (previous.value > node.value &&
					node.right == null && node.left != null) {
						previous.left = node.left;
					/* If Prev is *greater* than Node AND Left child is null */
					} else if (previous.value > node.value &&
					node.right != null && node.left == null) {
						previous.left = node.right;
					/* If Prev is *less* than Node AND Right child is null */
					} else if (previous.value < node.value &&
					node.right == null && node.left != null) {
						previous.right = node.left;
					/* If Prev is *less* than Node AND Left child is null */
					} else if (previous.value < node.value &&
					node.right != null && node.left == null) {
						previous.right = node.right;
					}
				}
				break;
			}
		}
	};

	/**
	 * Check if Tree contains value
	 * @param {number | any} value - Value to check
	 * @param {Node} check - Node to check (leave blank to run through whole tree)
	 *
	 * @return {boolean}
	 */
	contains = (value, check = this.root) => {
		// Base Cases
		if (check === null) return false;
		else if (value == check.value) return true;

		// Check if value is greater than or less than check
		// Call function again with the left or right Node
		else if (value < check.value) {
			return this.contains(value, check.left);
		} else if (value > check.value) {
			return this.contains(value, check.right);
		}
	};

	/**
	 * Pretty Print the BTS to the console
	 * for visualization
	 * @author TOP
	 * Note: Slightly edited to work in my `Tree` class
	 *
	 * @param {Node} node - Root Node / Current Node
	 * @param {string} prefix
	 * @param {boolean} isLeft - Is left?
	 * @return {void}
	 */
	prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			// eslint-disable-next-line max-len
			this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	};
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


// Tests
const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	16, 17, 18, 19, 20];

const tree = new Tree(sorted);
tree.delete(10);
tree.prettyPrint();
